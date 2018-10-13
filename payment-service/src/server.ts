import app from "./app";



class Server {

    constructor() {
        this.init();
    }
        
    private init() : void{ 
        require("dotenv").config();
    /**
    * Start Express server.
    */
        app.listen("3000", () => {
            console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
            console.log("  Press CTRL-C to stop\n");
          });
    }
}

new Server();