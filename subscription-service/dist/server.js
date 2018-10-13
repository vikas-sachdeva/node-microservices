"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
class Server {
    constructor() {
        this.init();
    }
    init() {
        require("dotenv").config();
        /**
        * Start Express server.
        */
        app_1.default.listen("3000", () => {
            console.log(("  App is running at http://localhost:%d in %s mode"), app_1.default.get("port"), app_1.default.get("env"));
            console.log("  Press CTRL-C to stop\n");
        });
    }
}
new Server();
//# sourceMappingURL=server.js.map