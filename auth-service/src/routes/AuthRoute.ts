import {NextFunction, Request, Response, Router} from "express";

import appLogger from "./../AppLogger";

export class AuthRoute {

  public get route(): Router {
      return this._router;
  }

    private _router: Router;

    constructor() {
    this._router = Router();
    this.init();
  }
    public auth(req: Request, res: Response, next: NextFunction): void {
      // If the request header `authorization` has this value, it is authenticated, else not.
      // curl http://localhost:3000/ -H 'authorization:mysecret'
        if (req.get("authorization") === "mysecret") {
            appLogger.info("User is authenticated.");
            res.json({
              ok: true,
            });
          } else {
            appLogger.info("User authentication failed.");
            res.status(401).json({
              ok: false,
            });
          }

    }

/**
 * Take each handler, and attach to one of the Express.Router's
 * endpoints.
 */

    private init() {
        this._router.use(this.auth);
    }
}

export default new AuthRoute() ;
