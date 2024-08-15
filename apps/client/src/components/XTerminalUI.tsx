import '@xterm/xterm/css/xterm.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import socket from '../utils/socket';

const instanceXTerm = new Terminal({
    cursorBlink: true,
    rows: 30
});

const fitAddon = new FitAddon();
instanceXTerm.loadAddon(fitAddon);

type TerminalProps = {
    isLoading: boolean;
};

const XTerminalUI = ({ isLoading }: TerminalProps) => {
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
            instanceXTerm.open(terminalRef.current);
            instanceXTerm.focus();
            fitAddon.fit();
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

        return () => {
            socket.off('ssh-output');
            socket.off('ssh-ready');
            socket.off('ssh-error');
            socket.off('title');
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
                <div
                    className="flex items-center h-8 rounded-t bg-gray-200 border-b border-gray-500 text-center text-black"
                    id="headerTerminal">
                    <div
                        className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"
                        id="closebtn"></div>
                    <div
                        className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"
                        id="minbtn"></div>
                    <div
                        className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"
                        id="maxbtn"></div>
                    <div className="mx-auto pr-16" id="terminaltitle">
                        <p className="text-center text-sm">{terminalTitle}</p>
                    </div>
                </div>
                <div className="w-full pl-4 pt-4" ref={terminalRef}></div>
            </div>
        </div>
    );
};

export default XTerminalUI;
