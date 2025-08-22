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
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const promptLength = useRef(0);

    const xtermRef = useRef(
        new Terminal({
            cursorBlink: true,
            fontFamily: 'monospace',
            theme: defaultTheme,
            allowProposedApi: true
        })
    );

    const resizeScreen = useCallback(() => {
        fitAddon.fit();
        const xterm = xtermRef.current;
        socket.emit('resize', { cols: xterm.cols, rows: xterm.rows });
        console.log(`resize: ${JSON.stringify({ cols: xterm.cols, rows: xterm.rows })}`);
    }, []);

    const defaultInput = (shouldUpdateTheme = false) => {
        const prompt = '[root@kzaman ~]$ ';
        const coloredPrompt = `[root@kzaman ~]\x1b[31m$ \x1b[0m`;
        promptLength.current = prompt.length;
        xtermRef.current.write(coloredPrompt);
        xtermRef.current.focus();

        if (!shouldUpdateTheme || !terminalRef.current) {
            return;
        }

        // set theme if available in local storage
        const savedTheme = JSON.parse(localStorage.getItem('theme') || '{}');
        if (savedTheme) {
            xtermRef.current.options.theme = savedTheme;
            // set background color for the terminal
            terminalRef.current.style.backgroundColor = savedTheme.background;
            return;
        }
        terminalRef.current.style.backgroundColor = defaultTheme.background as string;
    };

    const sshInputHandler = (data: string) => {
        // Prevent backspace from deleting the prompt
        if (data === '\x7f') {
            // backspace character
            const buffer = xtermRef.current.buffer.active;
            const currentPos = buffer.cursorX;

            // If cursor is at or before the prompt, don't allow backspace
            if (currentPos <= promptLength.current) {
                return;
            }
        }

        socket.emit('ssh-input', data);
    };

    const sshOutputHandler = (data: string) => {
        xtermRef.current.write(data);
        // Reset prompt protection when receiving SSH output
        promptLength.current = 0;
    };

    const sshReadyHandler = () => {
        xtermRef.current.writeln('Successfully connected to server\r');
        xtermRef.current.focus();
        // Reset prompt protection when connected to SSH
        promptLength.current = 0;
    };

    const sshErrorHandler = (err: string) => {
        console.error('SSH Error:', err);
        xtermRef.current.writeln(`Error: ${err}\r`);
    };

    const noConnectionOutputHandler = () => {
        xtermRef.current.writeln(
            '\r\nCommand not found! Please check the command and try again.\r'
        );
        defaultInput();
    };

    const onCloseHandler = () => {
        xtermRef.current.writeln('Connection closed\r');
        defaultInput();
    };

    /**
     * Load xterm addons and set the terminal theme
     * Set the terminal background color
     * Add event listener for window resize
     * Emit resize event to the server
     * Listen for ssh-output, ssh-ready, ssh-error, ssh-close, no-connection-output events
     * Listen for theme change event
     */

    const initTerminal = () => {
        if (!terminalRef.current) {
            console.error('Terminal container is not available');
            return;
        }
        const xterm = xtermRef.current;
        xterm.loadAddon(fitAddon);
        xterm.loadAddon(searchAddon);
        xterm.loadAddon(webLinksAddon);
        xterm.loadAddon(unicode11Addon);
        xterm.unicode.activeVersion = '11';
        xterm.open(terminalRef.current);

        resizeScreen();
        defaultInput(true);
        socket.on('ssh-output', sshOutputHandler);
        socket.on('ssh-ready', sshReadyHandler);
        socket.on('ssh-error', sshErrorHandler);
        socket.on('no-connection-output', noConnectionOutputHandler);
        socket.on('ssh-close', onCloseHandler);
        xterm.onData(sshInputHandler);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeScreen, false);
        return () => {
            window.removeEventListener('resize', resizeScreen);
        };
    }, []);

    useEffect(() => {
        initTerminal();

        return () => {
            socket.off('ssh-output', sshOutputHandler);
            socket.off('ssh-ready', sshReadyHandler);
            socket.off('ssh-error', sshErrorHandler);
            socket.off('resize', resizeScreen);
            socket.off('ssh-close', onCloseHandler);
            socket.off('no-connection-output', noConnectionOutputHandler);
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

    return <div className="h-full py-2" ref={terminalRef}></div>;
};

export default XTerminalUI;
