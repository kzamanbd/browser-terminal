import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import { FitAddon } from '@xterm/addon-fit';

type TerminalProps = {
    sessionId: string;
    setCommand: React.Dispatch<React.SetStateAction<string>>;
    output: string;
};
const TerminalView = ({ sessionId, setCommand, output }: TerminalProps) => {
    const terminalRef = useRef(null) as any;
    const [term, setTerm] = useState<any>(null);

    const echo = window.Echo;

    useEffect(() => {
        const instance = new Terminal();
        const fitAddon = new FitAddon();
        instance.loadAddon(fitAddon);
        instance.open(terminalRef.current);
        fitAddon.fit();
        setTerm(instance);
        if (output) {
            instance.writeln('Welcome to the SSH Terminal');
            instance.writeln(output);
        }
        instance.focus();

        const startSession = async () => {
            console.log('Session ID', sessionId);
            echo.channel(`ssh-room-${sessionId}`).listen('SshOutput', (data: any) => {
                console.log('ssh-output data', data);
                if (data.output) {
                    instance.writeln(data.output);
                } else if (data.error) {
                    instance.writeln(`Error: ${data.error}`);
                }
            });
        };

        startSession();

        return () => {
            if (sessionId) {
                window.axios.get('/ssh/kill-session', {
                    params: { sessionId }
                });
                instance.dispose();
                echo.leave(`ssh-room-${sessionId}`);
            }
        };
    }, [sessionId]);

    useEffect(() => {
        if (term) {
            term.onData((data: string) => {
                if (data === '\r') {
                    term.write('\r\n');
                } else {
                    // if click backspace key then remove last character from command
                    if (data.charCodeAt(0) === 127) {
                        term.write('\b \b');
                        return;
                    } else {
                        term.write(data);
                    }
                }

                setCommand((prev) => prev + data);
            });
        }
    }, [term, sessionId]);

    return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default TerminalView;

