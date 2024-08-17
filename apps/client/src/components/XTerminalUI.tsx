import '@xterm/xterm/css/xterm.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import socket from '../utils/socket';
import ThemesMenu from './ThemesMenu';
import { IXTerminal } from '../utils/themes';

const instanceXTerm = new Terminal({
    cursorBlink: true,
    fontFamily: 'monospace'
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
    const terminalRef = useRef(null as HTMLDivElement | null);
    const [xTerm, setXTerm] = useState<Terminal | null>(null);
    const [terminalTitle, setTerminalTitle] = useState('XTerminal');

    const resizeScreen = useCallback(() => {
        fitAddon.fit();
        socket.emit('resize', { cols: xTerm?.cols, rows: xTerm?.rows });
        console.log(`resize: ${JSON.stringify({ cols: xTerm?.cols, rows: xTerm?.rows })}`);
    }, [xTerm]);

    useEffect(() => {
        if (terminalRef.current && !xTerm) {
            instanceXTerm.focus();
            instanceXTerm.open(terminalRef.current);
            setXTerm(instanceXTerm);
            instanceXTerm.writeln('Welcome to XTerminal');
            instanceXTerm.write('[root@kzaman ~]\x1b[31m$ \x1b[0m');
            // set theme if available in local storage
            const theme = localStorage.getItem('theme');
            if (theme) {
                const parsedTheme = JSON.parse(theme);
                instanceXTerm.options.theme = parsedTheme;

                // set background color for the terminal
                terminalRef.current.style.backgroundColor = parsedTheme.background;
            }
        }
        resizeScreen();

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

        socket.on('no-connection-output', () => {
            xTerm?.writeln('\r\nCommand not found! Please check the command and try again.\r');
            xTerm?.write('[root@kzaman ~]\x1b[31m$ \x1b[0m');
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
            socket.off('resize');
            socket.off('close');
            socket.off('no-connection-output');
        };
    }, [xTerm]);

    useEffect(() => {
        if (isLoading && xTerm) {
            xTerm.clear();
            xTerm.writeln('Connecting to server...');
        }
    }, [isLoading, xTerm]);

    const themeChangeHandler = ({ theme }: IXTerminal) => {
        console.log('themeChange:', theme);
        instanceXTerm.options.theme = theme;
        // set background color for the terminal
        if (terminalRef.current) {
            terminalRef.current.style.background = theme.background as string;
        }
        localStorage.setItem('theme', JSON.stringify(theme));
    };

    return (
        <div className="shadow-2xl subpixel-antialiased rounded h-full bg-black border-black mx-auto">
            <div className="p-2 grid grid-cols-3 items-center justify-between rounded-t bg-gray-200 border-b border-gray-500 text-center text-black">
                <div className="relative flex gap-2">
                    <button type="button">File</button>
                    <button type="button">Edit</button>
                    <button type="button">View</button>
                    <ThemesMenu changeTheme={themeChangeHandler} />
                    <button type="button" onClick={reConnect}>
                        New Connection
                    </button>
                    <button type="button">Help</button>
                </div>

                <p className="text-center text-sm">{terminalTitle}</p>

                {reConnect && (
                    <div className="flex ml-auto gap-2">
                        <div className="border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"></div>
                        <div className="border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"></div>
                        <div className="flex items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"></div>
                    </div>
                )}
            </div>
            <div className="h-[calc(100%-50px)] pl-4 pt-4" ref={terminalRef}></div>
        </div>
    );
};

export default XTerminalUI;
