import * as winston from "winston";

class AppLogger {

      private _logger: winston.Logger;

      constructor() {
        this._logger = winston.createLogger({
        format : winston.format.combine(
          winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss,SSS",
          },
          ),
          winston.format.printf((i) => `${i.timestamp}  [${i.level}]  ${i.message}`),
        ),
        level : "debug",
        transports: [
          new winston.transports.Console(),
        ],
      });
    }

    public get logger(): winston.Logger {
      return this._logger;
    }
}

export default new AppLogger().logger;
