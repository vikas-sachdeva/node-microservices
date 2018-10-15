import app from "./App";
import appLogger from "./AppLogger";

class Server {

    constructor() {
        this.init();
    }

    private init(): void {
        require("dotenv").config();
    /**
     * Start Express server.
     */
        app.listen("3000", () => {
            appLogger.info(("App is running at http://localhost:3000"));
            appLogger.info("Press CTRL-C to stop\n");
          });
    }
}

const server = new Server();
