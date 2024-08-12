import { useEffect, useState } from 'react';
import XTerminalUI from './components/XTerminalUI';
import socket from './utils/socket';

function App() {
    const [isLoading, setIsLoading] = useState(false);

    const [input, setInput] = useState('root@203.188.245.58 -p 8823');

    useEffect(() => {
        socket.on('ssh-ready', () => {
            setIsLoading(false);
        });
    }, []);

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
        <div className="mx-auto flex flex-col max-w-6xl my-4">
            <form onSubmit={connectSSH} className="w-full mb-2">
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

            <XTerminalUI isLoading={isLoading} />
        </div>
    );
}

export default App;
