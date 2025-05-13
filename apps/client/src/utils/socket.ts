import io, { Socket } from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8081';
const socket: Socket = io(URL);

export default socket;
