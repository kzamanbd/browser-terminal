import io from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8081';
const socket = io(URL);

export default socket;
