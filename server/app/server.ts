import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { socketConnection } from './socket';
import { errorHandler, notFoundHandler, requestHandler } from './helpers';
import routes from './routes';
import { errorLogger, infoLogger, logger } from './utils/logger';
import { COOKIE_SECRET, PORT } from './config';

// Middleware
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const httpServer = http.createServer(app);

// request handler
app.use(infoLogger);
app.use(requestHandler);

// add socket.io
const io = new Server(httpServer, {
    cors: {
        origin: '*', // or client url
        methods: ['GET', 'POST']
    }
});

// set cors
app.use(cors({ credentials: true, origin: true }));
app.set('trust proxy', true);

// parse cookies
app.use(cookieParser(COOKIE_SECRET));

io.on('connection', socketConnection);

// Routes
app.use('/', routes);
// error logger
app.use(errorLogger);
// error handler
app.use(errorHandler);

// not found handler
app.use(notFoundHandler);
// connection
httpServer.listen(PORT, async () => {
    logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
