const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "silly",
  format: combine(timestamp({ format: "hh:mm:ss" }), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logger.log" }),
  ],
});

module.exports = logger;
