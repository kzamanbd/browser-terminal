import { Client } from 'ssh2';

export const socketConnection = (socket: any) => {
    console.log('Client connected', socket.id);

    socket.on('ssh', (config: any) => {
        const client = new Client();
        console.log('Client :: connecting');
        client
            .on('ready', () => {
                console.log('Client :: ready');
                socket.emit('ssh-ready');
                client.shell((err: any, stream: any) => {
                    if (err) {
                        socket.emit('ssh-error', err.message);
                        return;
                    }
                    socket.on('ssh-input', (data: any) => {
                        stream.write(data);
                    });
                    stream
                        .on('data', (data: any) => {
                            socket.emit('ssh-output', data.toString());
                        })
                        .on('close', () => {
                            client.end();
                        });
                });
            })
            .connect(config);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
};
