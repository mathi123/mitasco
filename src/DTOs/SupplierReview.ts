export class SupplierReview {
    private _rating: number;
    private _message: string;

    constructor() {

    }

    public get rating(): number {
        return this._rating;
    }

    public set rating(value: number) {
        this._rating = value;
    }

    public get message(): string {
        return this._message;
    }

    public set message(value: string) {
        this._message = value;
    }

    public toString(): string {
        return `${this._rating} - ${this._message}`;
    }
}