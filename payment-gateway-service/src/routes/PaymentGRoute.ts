import {NextFunction, Request, Response, Router} from "express";

import {PaymentGService} from "../services/PaymentGService";

import {PaymentObj} from "../model/PaymentObj";

import appLogger from "../AppLogger";

export class PaymentGRoute {

  public get route(): Router {
      return this._router;
  }

    private _router: Router;

    constructor() {
    this._router = Router();
    this.init();
  }

    /*
    * Call this API using below curl command -
    *
    * curl localhost:3000/api/payment-gateway/start \
    * -d "{\"amount\": 2000, \"cardNo\": \"1234-1234-1234-1234\"}" \
    * -H "Content-Type:application/json"
    *
    */
    public startPayment(req: Request, res: Response, next: NextFunction): void {
        appLogger.info("Request received for starting payment");
        const reqObj: PaymentObj = req.body;
        const paymentService = new PaymentGService();
        const status = paymentService.startPayment(reqObj);
        if ( status === true) {
            res.send("Payment of " + reqObj.amount + " is started for card no. " + reqObj.cardNo);
        } else {
            res.send("Payment of " + reqObj.amount + " is failed to start for card no. " + reqObj.cardNo);
            res.status(401);
        }

    }

    /*
    * Call this API using below curl command -
    *
    * curl localhost:3000/api/payment-gateway/stop \
    * -d "{\"amount\": 2000, \"cardNo\": \"1234-1234-1234-1234\"}" \
    * -H "Content-Type:application/json"
    */
    public stopPayment(req: Request, res: Response, next: NextFunction): void {
        appLogger.info("Request received for stopping payment ");
        const reqObj: PaymentObj = req.body;
        const paymentService = new PaymentGService();
        const status = paymentService.stopPayment(reqObj);
        if ( status === true) {
            res.send("Payment of " + reqObj.amount + " is stopped for card no. " + reqObj.cardNo);
        } else {
            res.send("Payment of " + reqObj.amount + " is failed to stopped for card no. " + reqObj.cardNo);
            res.status(401);
        }
    }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */

    private init() {
        this._router.post("/start/", this.startPayment);
        this._router.post("/stop/", this.stopPayment);
    }

}

export default new PaymentGRoute() ;
