import winston from "winston";
import "winston-daily-rotate-file";

// LOG FORMAT
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.prettyPrint()
);

// ACCESS LOG TRANSPORT
const accessTransport = new winston.transports.DailyRotateFile({
  dirname: "logs",
  filename: "access-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});


//ERROR LOG TRANSPORT
const errorTransport = new winston.transports.DailyRotateFile({
  dirname: "logs",
  filename: "error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxFiles: "30d",
});


// MAIN LOGGER
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    accessTransport,
    errorTransport,
    // -- Printing logs in console screen ----
    // new winston.transports.Console({ 
    //   format: winston.format.simple() 
    // })
  ]
});


// REQUEST LOGGING
export function logRequest(details) {
  logger.info({
    type: "REQUEST",
    ...details
  });
}

// ERROR LOGGING
export function logError(details) {
  logger.error({
    type: "ERROR",
    ...details
  });
}


//HEALTH CHECK LOGGING
export function logHealth(details) {
  logger.info({
    type: "HEALTH",
    ...details
  });
}

export default logger;
