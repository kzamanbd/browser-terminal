import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

const socket = io('http://localhost:8000');

function TerminalUI() {
    const [command, setCommand] = useState('');

    const terminalRef = useRef<any>(null);
    const [term, setTerm] = useState<any>(null);

    console.log('Typed command', command);

    useEffect(() => {
        socket.on('ssh-output', (data) => {
            // setOutput((prev) => prev + data);
            term.write(data);
        });
        socket.on('ssh-ready', () => {
            console.log('SSH connection ready');
            const instance = new Terminal();
            instance.open(terminalRef.current);
            setTerm(instance);
        });
        socket.on('ssh-error', (err) => {
            console.error('SSH Error:', err);
        });
        return () => {
            socket.off('ssh-output');
            socket.off('ssh-ready');
            socket.off('ssh-error');
        };
    }, [term, command]);

    useEffect(() => {
        if (term) {
            term.onData((data: string) => {
                if (data === '\r') {
                    term.write('\r\n');
                } else {
                    // if click backspace key then remove last character from command
                    if (data.charCodeAt(0) === 127) {
                        term.write('\b \b');
                        setCommand((prev) => prev.slice(0, -1));
                        return;
                    } else {
                        term.write(data);
                    }
                }
                setCommand((prev) => prev + data);
            });
        }
    }, [term]);

    useEffect(() => {
        if (command) {
            if (command === 'clear') {
                // clear terminal
            } else if (command.endsWith('\r')) {
                // trim command and send to server
                const commandString = command.slice(0, -1).trim();
                socket.emit('ssh-input', commandString + '\n');
                setCommand('');
            }
        }
    }, [command]);

    const connectSSH = () => {
        socket.emit('ssh', {
            host: '203.188.245.58',
            port: 8823,
            username: 'root',
            password: 'Monon$#Web.12' // or use a private key
        });
    };

    return (
        <div className="terminal-ui">
            <button onClick={connectSSH}>Connect SSH</button>
            <div ref={terminalRef} style={{ height: '100%', width: '100%', whiteSpace: 'pre-wrap' }}></div>
        </div>
    );
}

export default TerminalUI;
