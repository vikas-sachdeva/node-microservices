"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const ItemRoute_1 = require("./routes/ItemRoute");
class App {
    constructor() {
        this._app = express();
        this.config();
        this.routes();
    }
    config() {
        // support application/json type post data
        this._app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(compression());
    }
    routes() {
        let router = express.Router();
        // placeholder route handler
        router.get('/hi', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this._app.use('/', router);
        this._app.use('/getAllItems', ItemRoute_1.default.route);
    }
    get app() {
        return this._app;
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map