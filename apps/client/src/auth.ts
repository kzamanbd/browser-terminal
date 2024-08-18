interface AuthProvider {
    isAuthenticated: boolean;
    username: null | string;
    login(username: string): Promise<void>;
    logout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {
    isAuthenticated: false,
    username: null,
    async login(username: string) {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        fakeAuthProvider.isAuthenticated = true;
        fakeAuthProvider.username = username;
    },
    async logout() {
        await new Promise((r) => setTimeout(r, 500)); // fake delay
        fakeAuthProvider.isAuthenticated = false;
        fakeAuthProvider.username = '';
    }
};
