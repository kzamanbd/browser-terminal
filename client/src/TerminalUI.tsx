import '@xterm/xterm/css/xterm.css';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

const socket = io('http://localhost:8000');

function TerminalUI() {
    const [command, setCommand] = useState('');

    const terminalRef = useRef(null);
    const [term, setTerm] = useState<Terminal | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [input, setInput] = useState('root@203.188.245.58 -p 8823');

    console.log('Typed command', command);

    useEffect(() => {
        socket.on('ssh-output', (data) => {
            if (term) {
                term.write(data);
                console.log('SSH output:', data);
            }
        });
        socket.on('ssh-ready', () => {
            console.log('SSH connection ready');
            setIsLoading(false);
            const instance = new Terminal();
            const fitAddon = new FitAddon();
            instance.loadAddon(fitAddon);
            if (terminalRef.current) {
                instance.writeln('Welcome to the SSH Terminal');
                instance.open(terminalRef.current);
                fitAddon.fit();
            }
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
    }, [term]);

    // handle terminal input data
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

    // handle command submit event

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

    const connectSSH = (e: React.FormEvent) => {
        e.preventDefault();

        // extract host, port, username, password from input
        const username = input.split('@')[0];
        const host = input.split('@')[1].split('-p')[0].trim();
        const port = input.split('@')[1].split('-p')[1].trim();
        if (!username || !host) {
            alert('Invalid input format, expected: username@host -p port');
            return;
        }

        // input password in prompt
        const password = prompt('Enter password');
        if (!password) {
            alert('Password required');
            return;
        }
        if (confirm('Are you sure to connect?')) {
            setIsLoading(true);

            socket.emit('ssh', {
                host: host,
                port: port || 22,
                username: username,
                password: password // or private key
            });
        }
    };

    return (
        <div className="mx-auto flex flex-col max-w-4xl my-4">
            {!term ? (
                <form onSubmit={connectSSH} className="w-full">
                    <div className="relative">
                        <input
                            type="credentials"
                            value={input}
                            id="credentials"
                            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus-visible:outline-0 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="root@13.54.100.2 -p 22"
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Connect
                        </button>
                    </div>
                </form>
            ) : (
                isLoading && (
                    <div className="flex items-center justify-center w-full h-full">
                        <svg
                            className="w-10 h-10 text-blue-500 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="4"></path>
                        </svg>
                    </div>
                )
            )}

            <div className={`terminal ${!term && 'hidden'}`}>
                <div className="terminal-header">
                    <div className="buttons">
                        <span className="button close"></span>
                        <span className="button minimize"></span>
                        <span className="button maximize"></span>
                    </div>
                </div>
                <div className="terminal-body typewriter">
                    <div className="w-full" ref={terminalRef}></div>
                </div>
            </div>
        </div>
    );
}

export default TerminalUI;
