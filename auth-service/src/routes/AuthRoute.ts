import {Router, Request, Response, NextFunction} from 'express';

export class AuthRoute {
    
    private _router: Router

    constructor() {
    this._router = Router();
    this.init();
  }

  public get route(): Router{
      return this._router;
  }

/**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */

    private init(){
        this._router.use(this.auth);
    }
    public auth(req: Request, res: Response, next: NextFunction): void {
      // If the request header `authorization` has this value, it is authenticated, else not.
      // curl http://localhost:3000/ -H 'authorization:mysecret'
        if (req.get('authorization') === "mysecret") {
            res.json({
              ok: true
            })
          } else {
            res.status(401).json({
              ok: false
            })
          }

    }
}

export default new AuthRoute() ;