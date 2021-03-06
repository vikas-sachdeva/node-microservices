import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";
import appRoute from "./routes/PaymentRoute";

import { NextFunction, Request, Response } from "express";

class App {

    private _app: express.Application;

    constructor() {
        this._app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        // support application/json type post data
        this._app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(compression());
    }

    private routes(): void {
        this._app.use("/api/payment/", appRoute.route);

    }

    public get app(): express.Application {
        return this._app;
    }

}

export default new App().app;
