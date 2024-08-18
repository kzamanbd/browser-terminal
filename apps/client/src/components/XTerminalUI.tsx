import socket from '@/utils/socket';
import { defaultTheme } from '@/utils/themes';
import { FitAddon } from '@xterm/addon-fit';
import { SearchAddon } from '@xterm/addon-search';
import { Unicode11Addon } from '@xterm/addon-unicode11';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { ITheme, Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { useCallback, useEffect, useRef } from 'react';

const fitAddon = new FitAddon();
const webLinksAddon = new WebLinksAddon();
const searchAddon = new SearchAddon();
const unicode11Addon = new Unicode11Addon();

type TerminalProps = {
    loading: boolean;
    theme?: ITheme;
};

const XTerminalUI = ({ loading, theme }: TerminalProps) => {
    const terminalRef = useRef({} as HTMLDivElement);

    const xtermRef = useRef(
        new Terminal({
            cursorBlink: true,
            fontFamily: 'monospace',
            theme: defaultTheme
        })
    );

    const resizeScreen = useCallback(() => {
        fitAddon.fit();
        const xterm = xtermRef.current;
        socket.emit('resize', { cols: xterm.cols, rows: xterm.rows });
        console.log(`resize: ${JSON.stringify({ cols: xterm.cols, rows: xterm.rows })}`);
    }, []);

    const defaultInput = () => {
        xtermRef.current?.write('[root@kzaman ~]\x1b[31m$ \x1b[0m');
        xtermRef.current.focus();
    };

    /**
     * Load xterm addons and set the terminal theme
     * Set the terminal background color
     * Add event listener for window resize
     * Emit resize event to the server
     * Listen for ssh-output, ssh-ready, ssh-error, ssh-close, no-connection-output events
     * Listen for theme change event
     */

    useEffect(() => {
        const xterm = xtermRef.current;
        xterm.loadAddon(fitAddon);
        xterm.loadAddon(searchAddon);
        xterm.loadAddon(webLinksAddon);
        xterm.loadAddon(unicode11Addon);
        xterm.open(terminalRef.current);
        xterm.writeln('Welcome to XTerminal');
        defaultInput();

        // set theme if available in local storage
        const theme = localStorage.getItem('theme');
        if (theme) {
            const parsedTheme = JSON.parse(theme);
            xterm.options.theme = parsedTheme;

            // set background color for the terminal
            terminalRef.current.style.backgroundColor = parsedTheme.background;
        }
        resizeScreen();

        window.addEventListener('resize', resizeScreen, false);

        return () => {
            window.removeEventListener('resize', resizeScreen);
        };
    }, [resizeScreen]);

    useEffect(() => {
        const xterm = xtermRef.current;
        socket.on('ssh-output', (data) => {
            xterm.write(data);
        });

        socket.on('ssh-ready', () => {
            xterm?.writeln('Successfully connected to server\r');
            xterm.focus();
        });

        socket.on('ssh-error', (err) => {
            console.error('SSH Error:', err);
            xterm?.writeln(`Error: ${err}\r`);
        });

        xterm.onData((data: string) => {
            socket.emit('ssh-input', data);
        });

        socket.on('no-connection-output', () => {
            xterm?.writeln('\r\nCommand not found! Please check the command and try again.\r');
            defaultInput();
        });

        socket.on('ssh-close', () => {
            xterm.writeln('Connection closed\r');
            defaultInput();
        });

        return () => {
            socket.off('ssh-output');
            socket.off('ssh-ready');
            socket.off('ssh-error');
            socket.off('resize');
            socket.off('ssh-close');
            socket.off('no-connection-output');
        };
    }, []);

    useEffect(() => {
        if (loading) {
            xtermRef.current.clear();
            xtermRef.current.writeln('Connecting to server...\r');
        }
    }, [loading]);

    useEffect(() => {
        if (theme?.background) {
            xtermRef.current.options.theme = theme;
            // set background color for the terminal
            if (terminalRef.current) {
                terminalRef.current.style.background = theme.background as string;
            }
        }
    }, [theme]);

    return <div className="h-[calc(100%-50px)] pl-2 pt-2" ref={terminalRef}></div>;
};

export default XTerminalUI;
