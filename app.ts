import donenv from 'dotenv';
import Server from './models/server';
donenv.config();

const server = new Server();

server.listen();