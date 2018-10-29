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
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            appLogger.info(("App is running at http://localhost:" + port));
            appLogger.info("Press CTRL-C to stop\n");
          });
    }
}

const server = new Server();
