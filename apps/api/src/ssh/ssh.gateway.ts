import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Client } from 'ssh2';

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
    /**
     * Logger instance for the SshGateway class
     * @private
     */
    private readonly logger = new Logger(SshGateway.name);

    /**
     * Flag to indicate whether an SSH connection has been established
     * @private
     */
    private sshConnectionEstablished = false;

    /**
     * The WebSocket server instance
     * @private
     * @type {Server}
     */

    @WebSocketServer() server: Server;

    /**
     * Called after the WebSocket server has been initialized
     */
    afterInit() {
        this.logger.log('WebSocket server initialized');
    }

    /**
     * Handle a new client connection
     * @param client The client socket that has connected
     */
    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    /**
     * Handle a client disconnection
     * @param client The client socket that has disconnected
     * @param reason The reason for the disconnection
     */

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    /**
     * Handle an SSH connection request from a client
     * @param client The client socket that sent the message
     * @param config The SSH connection configuration
     * @emits ssh-ready, ssh-error, ssh-output, ssh-close, ssh-banner, ssh-keyboard-interactive
     */

    @SubscribeMessage('ssh')
    handleSsh(client: Socket, config: ConnectionConfig) {
        client.removeAllListeners('ssh-input');

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

        // Log the connection configuration
        sshClient.on('ready', () => {
            this.logger.log('Client :: ready');
            client.emit('ssh-ready');
            // get hostname
            sshClient.exec('hostname', (err, stream) => {
                if (err) {
                    this.logger.error(`Error getting hostname: ${err.message}`);
                    return;
                }
                stream.on('data', (data: string) => {
                    client.emit('title', `${finalConfig.username}@${data}:~`);
                });
            });
            this.sshConnectionEstablished = true;
            sshClient.shell((err, stream) => {
                if (err) {
                    client.emit('ssh-error', err.message);
                    this.logger.error(`Shell error: ${err.message}`);
                    return;
                }

                client.on('ssh-input', (data) => {
                    stream.write(data);
                });

                client.on('resize', (data) => {
                    stream.setWindow(data.rows, data.cols, data.height, data.width);
                    this.logger.log(`SOCKET RESIZE: ${JSON.stringify([data.rows, data.cols])}`);
                });

                stream.on('data', (data: any) => {
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
            this.sshConnectionEstablished = false;
            client.emit('title', 'XTerminal');
        });

        try {
            sshClient.connect(finalConfig);
        } catch (err) {
            client.emit('ssh-error', 'Connection error: ' + err.message);
        }
    }

    /**
     * Handle an SSH input event from a client
     * @param client
     * @param data string
     * @emits ssh-output
     * @returns void
     */

    @SubscribeMessage('ssh-input')
    handleSshInput(client: Socket, data: string) {
        if (!this.sshConnectionEstablished) {
            // if backspace is pressed, remove the last character
            if (data === '\x7f') {
                client.emit('ssh-output', '\b \b');
            } else if (data === '\r') {
                // if enter is pressed, emit a new line
                client.emit('no-connection-output');
            } else {
                // otherwise, emit the input
                client.emit('ssh-output', data);
            }
        }
    }
}
