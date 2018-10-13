import {Router, Request, Response, NextFunction} from 'express';

import * as service from "./../services/ItemService"

export class ItemRoute {
    
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
        this._router.get('/', this.getAllItems);
    }
    public getAllItems(req: Request, res: Response, next: NextFunction): void {
        let itemService = new service.ItemService();
        res.send(itemService.getAllItems());
    }

}

export default new ItemRoute() ;