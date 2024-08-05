import { Request, Response } from 'express';
import expressWinston from 'express-winston';
import { createLogger, format, transports } from 'winston';

const logFormat = format.printf(
    ({ level, message, timestamp, stack }: any) => `${timestamp}: ${level} - ${stack || message}`
);
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    verbose: 'cyan',
    debug: 'white'
};

export const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize({ colors }),
        format.timestamp({ format: 'DD/MM/YYYY || HH:mm:ss' }),
        format.errors({ stack: true }),
        logFormat
    ),
    transports: [new transports.Console()]
});

const getLogMessage = (req: Request, res: Response) => {
    const msgObj = {
        request: req.body,
        correlationId: req.headers['x-correlation-id']
    };

    return JSON.stringify(msgObj);
};

export const infoLogger = expressWinston.logger({
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.cli({ colors })),
            handleExceptions: true
        })
    ],
    format: format.combine(format.colorize(), format.json()),
    meta: false,
    msg: getLogMessage
});

export const errorLogger = expressWinston.errorLogger({
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.cli({ colors })),
            handleExceptions: true
        })
    ],
    format: format.combine(format.colorize(), format.json()),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error" : "{{err.message}}" }'
});
