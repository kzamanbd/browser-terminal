import '@xterm/xterm/css/xterm.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import socket from '../utils/socket';

const instanceXTerm = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'monospace',
    rows: 35
});

const fitAddon = new FitAddon();
const webLinksAddon = new WebLinksAddon();
const searchAddon = new SearchAddon();
instanceXTerm.loadAddon(fitAddon);
instanceXTerm.loadAddon(webLinksAddon);
instanceXTerm.loadAddon(searchAddon);

type TerminalProps = {
    isLoading: boolean;
    reConnect?: () => void;
};

const XTerminalUI = ({ isLoading, reConnect }: TerminalProps) => {
    const terminalRef = useRef(null);
    const [xTerm, setXTerm] = useState<Terminal | null>(null);
    const [terminalTitle, setTerminalTitle] = useState('XTerminal');

    const resizeScreen = useCallback(() => {
        fitAddon.fit();
        socket.emit('resize', { cols: xTerm?.cols, rows: xTerm?.rows });
        console.log(`resize: ${JSON.stringify({ cols: xTerm?.cols, rows: xTerm?.rows })}`);
    }, [xTerm]);

    useEffect(() => {
        if (terminalRef.current && !xTerm) {
            fitAddon.fit();
            instanceXTerm.focus();
            instanceXTerm.open(terminalRef.current);
            setXTerm(instanceXTerm);
            instanceXTerm.writeln('Welcome to XTerminal');
            instanceXTerm.write('\x1b[31m$ \x1b[0m');
            resizeScreen();
        }

        window.addEventListener('resize', resizeScreen, false);

        return () => {
            window.removeEventListener('resize', resizeScreen);
        };
    }, [resizeScreen, xTerm]);

    useEffect(() => {
        socket.on('ssh-output', (data) => {
            if (xTerm) {
                xTerm.write(data);
            }
        });

        socket.on('ssh-ready', () => {
            xTerm?.writeln('Successfully connected to server');
            instanceXTerm.focus();
        });

        socket.on('ssh-error', (err) => {
            console.error('SSH Error:', err);
            xTerm?.writeln(`Error: ${err}`);
        });

        if (xTerm) {
            xTerm.onData((data: string) => {
                socket.emit('ssh-input', data);
            });
        }

        socket.on('title', (data: string) => {
            setTerminalTitle(data);
            window.document.title = data;
        });

        socket.on('close', () => {
            if (xTerm) {
                xTerm.writeln('Connection closed');
            }
        });

        return () => {
            socket.off('title');
            socket.off('ssh-output');
            socket.off('ssh-ready');
            socket.off('ssh-error');
            socket.off('close');
        };
    }, [xTerm]);

    useEffect(() => {
        if (isLoading && xTerm) {
            xTerm.clear();
            xTerm.writeln('Connecting to server...');
        }
    }, [isLoading, xTerm]);

    return (
        <div className="w-full">
            <div className="w-full shadow-2xl subpixel-antialiased rounded h-full bg-black border-black mx-auto">
                <div className="p-2 flex items-center justify-between rounded-t bg-gray-200 border-b border-gray-500 text-center text-black">
                    <div className="flex gap-2">
                        <button type="button">File</button>
                        <button type="button">Edit</button>
                        <button type="button">View</button>
                        <button type="button">Terminal</button>
                        <button type="button" onClick={reConnect}>
                            Connect
                        </button>
                        <button type="button">Help</button>
                    </div>

                    <div className="mx-auto pr-16">
                        <p className="text-center text-sm">{terminalTitle}</p>
                    </div>
                    {reConnect && (
                        <div className="flex gap-2">
                            <div className="flex items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"></div>
                            <div className="border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"></div>
                            <div className="border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"></div>
                        </div>
                    )}
                </div>
                <div className="w-full pl-4 pt-4" ref={terminalRef}></div>
            </div>
        </div>
    );
};

export default XTerminalUI;
