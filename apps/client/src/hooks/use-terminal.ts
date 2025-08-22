import socket from '@/utils/socket';
import { IXTerminal } from '@/utils/themes';
import { ITheme } from '@xterm/xterm';
import { useEffect, useState } from 'react';

type SSHConnection = {
    host: string;
    port: string;
    username: string;
    key?: string;
    password?: string;
};

export default function useTerminal() {
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const [formState, setFormState] = useState({
        password: import.meta.env.VITE_SSH_PASSWORD as string,
        privateKey: '',
        hasKey: false,
        showPassword: false,
        input: 'root@203.188.245.58 -p 8886'
    });

    const [terminalState, setTerminalState] = useState({
        id: '',
        title: 'Terminal',
        status: 'disconnected',
        theme: {} as ITheme
    });

    useEffect(() => {
        socket.on('connect', () => {
            setTerminalState((prev) => ({ ...prev, id: socket.id || '', status: 'connected' }));
        });

        socket.on('ssh-ready', () => {
            setIsLoading(false);
        });
        socket.on('title', (data: string) => {
            window.document.title = data;
            setTerminalState((prev) => ({ ...prev, title: data }));
        });

        return () => {
            socket.off('connect');
            socket.off('ssh-ready');
            socket.off('title');
        };
    }, []);

    const themeHandler = ({ theme }: IXTerminal) => {
        setTerminalState((prev) => ({ ...prev, theme }));
        localStorage.setItem('theme', JSON.stringify(theme));
    };

    const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Form submitted', e);
        const name = e.target.name;
        const value = e.target.value;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const connectionAction = (config: SSHConnection) => {
        setIsLoading(true);
        console.log('Connecting to SSH', config);
        if (!config.host || !config.port || !config.username || (!config.key && !config.password)) {
            alert('Host, Port, and Username are required');
            setIsLoading(false);
            return;
        }
        socket.emit('ssh', {
            ...config,
            port: config.port || '22',
            [config.key ? 'privateKey' : 'password']: config.key ? config.key : formState.password
        });
    };

    const connectSSH = (e: React.FormEvent) => {
        e.preventDefault();
        const { input, password, hasKey, privateKey } = formState;
        if (!input) {
            alert('Host is required');
            return;
        }
        // extract host, port, username, password from input
        const username = input.split('@')[0];
        const host = input.split('@')[1]?.split('-p')[0]?.trim();
        const port = input.split('@')[1]?.split('-p')[1]?.trim();
        if (!username || !host) {
            alert('Invalid input format, expected: username@host -p port');
            return;
        }

        if (!password && !hasKey) {
            alert('Password required');
            return;
        }
        connectionAction({ host, port, username, key: hasKey ? privateKey : '', password });
        setIsModal(!isModal);
    };

    const handlePrivateKey = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            alert('Please select a file first');
            return;
        }

        const reader = new FileReader();
        reader.onload = function (event) {
            setFormState((prev) => ({
                ...prev,
                hasKey: true,
                privateKey: event.target?.result as string
            }));
        };

        reader.onerror = function (event) {
            console.error('Error reading file:', event.target?.error);
        };

        reader.readAsText(file);
    };

    const toggleModal = () => {
        setIsModal((prev) => !prev);
    };

    const closeModal = () => {
        setIsModal(false);
    };

    const toggleShowPassword = () => {
        setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    };

    return {
        isLoading,
        formState,
        setFormState,
        terminalState,
        // other state
        isModal,
        toggleModal,
        closeModal,
        connectSSH,
        formHandler,
        themeHandler,
        handlePrivateKey,
        toggleShowPassword
    };
}

