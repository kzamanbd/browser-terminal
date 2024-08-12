import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Client } from 'ssh2';
import { Logger } from '@nestjs/common';

export type ConnectionConfig = {
    host: string;
    port: number;
    username?: string;
    password?: string;
    privateKey?: string;
    passphrase?: string;
};

@WebSocketGateway({ cors: true })
export class SshGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(SshGateway.name);

    @WebSocketServer() server: Server;

    afterInit() {
        this.logger.log('WebSocket server initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('ssh')
    handleSsh(client: Socket, config: ConnectionConfig) {
        const sshClient = new Client();
        this.logger.log('Client :: connecting...');

        // Set default values for host machine connection
        const defaultConfig = {
            host: 'localhost',
            port: 22,
            username: process.env.USER || 'defaultUsername', // Default to the current user or a specified default
            password: undefined,
            privateKey: undefined,
            passphrase: undefined
        };

        // Merge the user-provided config with defaults
        const finalConfig = {
            ...defaultConfig,
            ...config
        };

        sshClient.on('ready', () => {
            this.logger.log('Client :: ready');
            client.emit('ssh-ready');
            client.emit('title', `ssh://${finalConfig.username}@${finalConfig.host}`);
            sshClient.shell((err, stream) => {
                if (err) {
                    client.emit('ssh-error', err.message);
                    this.logger.error(`Shell error: ${err.message}`);
                    return;
                }

                // Change directory to /var/www/html when shell starts
                stream.write('cd /var/www/html\n');

                client.on('ssh-input', (data) => {
                    stream.write(data);
                });

                client.on('resize', (data) => {
                    stream.setWindow(data.rows, data.cols, data.height, data.width);
                    this.logger.log(`SOCKET RESIZE: ${JSON.stringify([data.rows, data.cols])}`);
                });

                stream.on('data', (data) => {
                    client.emit('ssh-output', data.toString('utf-8'));
                });

                stream.on('close', () => {
                    sshClient.end();
                });

                stream.stderr.on('data', (data) => {
                    this.logger.error(`STDERR: ${data}`);
                });
            });
        });

        sshClient.on('error', (err) => {
            this.logger.error(`SSH Connection error: ${err.message}`);
            client.emit('ssh-error', `SSH Connection error: ${err.message}`);
        });

        sshClient.on(
            'keyboard-interactive',
            (name, instructions, instructionsLang, prompts, finish) => {
                this.logger.log('Keyboard-interactive authentication requested.');
                client.emit('ssh-keyboard-interactive', {
                    name,
                    instructions,
                    instructionsLang,
                    prompts
                });
                client.on('ssh-keyboard-interactive-response', (responses) => {
                    finish(responses);
                });
            }
        );

        sshClient.on('banner', (message) => {
            this.logger.log(`SSH Banner: ${message}`);
            client.emit('ssh-banner', message);
        });

        sshClient.on('close', () => {
            this.logger.log('SSH connection closed');
            client.emit('ssh-close');
        });

        try {
            sshClient.connect(finalConfig);
        } catch (err) {
            client.emit('ssh-error', 'Connection error: ' + err.message);
        }
    }
}
