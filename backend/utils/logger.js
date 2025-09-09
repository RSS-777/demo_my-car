const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            level: 'error',
            datePattern: 'YYYY-MM-DD', 
            maxSize: '20m',  
            maxFiles: '7d'  
        }),
        new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            level: 'info', 
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '7d' 
        })
    ]
});

module.exports = logger;

