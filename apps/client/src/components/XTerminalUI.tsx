import '@xterm/xterm/css/xterm.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Terminal, ITheme } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import socket from '../utils/socket';

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
    theme?: ITheme;
    setTitle?: (title: string) => void;
};

const XTerminalUI = ({ isLoading, theme, setTitle }: TerminalProps) => {
    const terminalRef = useRef(null as HTMLDivElement | null);
    const [xTerm, setXTerm] = useState<Terminal | null>(null);

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
            window.document.title = data;
            if (setTitle) setTitle(data);
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
    }, [xTerm, setTitle]);

    useEffect(() => {
        if (isLoading && xTerm) {
            xTerm.clear();
            xTerm.writeln('Connecting to server...');
        }
    }, [isLoading, xTerm]);

    useEffect(() => {
        if (theme?.background) {
            console.log('themeChange:', theme);
            instanceXTerm.options.theme = theme;
            // set background color for the terminal
            if (terminalRef.current) {
                terminalRef.current.style.background = theme.background as string;
            }
        }
    }, [theme]);

    return <div className="h-[calc(100%-50px)] pl-4 pt-4" ref={terminalRef}></div>;
};

export default XTerminalUI;
