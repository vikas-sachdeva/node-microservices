import {Router, Request, Response, NextFunction} from 'express';

import {PaymentService} from "./../services/PaymentService"

export class PaymentRoute {
    
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
        this._router.get('/start/:itemId', this.startPayment);
        this._router.get('/stop/:itemId', this.stopPayment);
    }

    public startPayment(req: Request, res: Response, next: NextFunction): void {
        let itemId = req.params.itemId;
        let paymentService = new PaymentService();
        let status = paymentService.startPayment(itemId);
        if( status == true){
            res.send("Payment started for item " + itemId);
        }else{
            res.send("Payment start operation failed for item "+itemId);
            res.status(401);
        }
        
    }

    public stopPayment(req: Request, res: Response, next: NextFunction): void {
        let itemId = req.params.itemId;
        let paymentService = new PaymentService();
        let status = paymentService.stopPayment(itemId);
        if( status == true){
            res.send("Payment stopped for item "+itemId);
        }else{
            res.send("Payment stopped operation failed for item "+itemId);
            res.status(401);
        }
    }

}

export default new PaymentRoute() ;