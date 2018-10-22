import * as requestPromise from "request-promise";
import appLogger from "./../AppLogger";

export class PaymentService {

    public async startPayment(itemId: string): Promise<boolean> {
        const options = {
            body : {
                amount : 2000,
                cardNo : "1234-1234-1234-1234",
            },
            headers: {
                "Content-Type": "application/json",
            },
            json : true,
            method : "POST",
            uri : process.env.PAYMENT_GATEWAY_URI + "/api/payment-gateway/start",

        };

        const response = await requestPromise(options).
        then((body) => { appLogger.info(body); return true; }).
        catch((err) => {appLogger.warn(err); return false; });
        return response;

    }

    public async stopPayment(itemId: string): Promise<boolean> {

        const options = {
            body : {
                amount : 2000,
                cardNo : "1234-1234-1234-1234",
            },
            headers: {
                "Content-Type": "application/json",
            },
            json : true,
            method : "POST",
            uri : process.env.PAYMENT_GATEWAY_URI + "/api/payment-gateway/stop",

        };

        const response = await requestPromise(options).
        then((body) => { appLogger.info(body); return true; }).
        catch((err) => {appLogger.warn(err); return false; });
        return response;

    }
}
