import {NextFunction, Request, Response, Router} from "express";

import {PaymentService} from "./../services/PaymentService";

import appLogger from "./../AppLogger";

export class PaymentRoute {

  public get route(): Router {
      return this._router;
  }

    private _router: Router;

    constructor() {
    this._router = Router();
    this.init();
  }

    public async startPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
        appLogger.info("Request received for starting payment");
        const itemId = req.params.itemId;
        const paymentService = new PaymentService();
        const status = await paymentService.startPayment(itemId);
        if ( status === true) {
            res.send("Payment started for item " + itemId);
        } else {
            res.send("Payment start operation failed for item " + itemId);
            res.status(401);
        }

    }

    public async stopPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
        appLogger.info("Request received for stopping payment");
        const itemId = req.params.itemId;
        const paymentService = new PaymentService();
        const status = await paymentService.stopPayment(itemId);
        if ( status === true) {
            res.send("Payment stopped for item " + itemId);
        } else {
            res.send("Payment stopped operation failed for item " + itemId);
            res.status(401);
        }
    }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */

    private init() {
        this._router.get("/start/:itemId", this.startPayment);
        this._router.get("/stop/:itemId", this.stopPayment);
    }

}

export default new PaymentRoute() ;
