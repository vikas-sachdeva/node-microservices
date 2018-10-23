import {NextFunction, Request, Response, Router} from "express";

import * as service from "./../services/ItemService";

import appLogger from "./../AppLogger";

export class ItemRoute {

  public get route(): Router {
      return this._router;
  }

    private _router: Router;

    constructor() {
    this._router = Router();
    this.init();
  }
    public getAllItems(req: Request, res: Response, next: NextFunction): void {
        appLogger.info("Request received for getAllItems");
        const itemService = new service.ItemService();
        res.send(itemService.getAllItems());
    }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */

    private init() {
        this._router.get("/", this.getAllItems);
    }

}

export default new ItemRoute() ;
