"use strict";

const path = require("path");
const winston = require("winston");

const DateFormat = require("date-format");

module.exports = (dir) => {
  const logFile = path.join(
    dir,
    `run_${DateFormat.asString("yyyy-MM-dd-hh-mm-ss-SSS ", new Date())}.log`
  );

  return winston.createLogger({
    level: "verbose",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
      })
    ),
    transports: [
      new winston.transports.File({
        filename: logFile,
      }),
    ],
  });
};
