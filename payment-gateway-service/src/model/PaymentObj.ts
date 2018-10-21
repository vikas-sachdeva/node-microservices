export class PaymentObj {
    private _amount: number;
    private _cardNo: string;
    constructor(amount: number, cardNo: string) {
        this._amount = amount;
        this._cardNo = cardNo;
    }

    public get amount(): number {
        return this._amount;
    }

    public set amount(amount: number) {
        this._amount = amount;
    }

    public get cardNo(): string {
        return this._cardNo;
    }

    public set name(cardNo: string) {
        this._cardNo = cardNo;
    }
}
