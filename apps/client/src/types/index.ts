export interface SSHConnection {
    host: string;
    port: string;
    username: string;
    key?: string;
    password?: string;
}

export interface FormState {
    password: string;
    privateKey: string;
    hasKey: boolean;
    showPassword: boolean;
    input: string;
}

