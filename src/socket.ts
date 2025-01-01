import { io } from 'socket.io-client';

const SOCKET_PORT = 3006;
const URL = process.env.NODE_ENV === 'production' ? undefined : `http://localhost:${SOCKET_PORT}`;

export const socket = io(URL);
