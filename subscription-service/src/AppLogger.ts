import * as winston from "winston";

class AppLogger {

      private _logger: winston.Logger;
      constructor() {
      this._logger = winston.createLogger({
        format : winston.format.json(),
        level : "info",
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
