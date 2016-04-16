import { Company } from './Company';
import { SupplierReview } from './SupplierReview';

export class Supplier extends Company {
    private _reviews: SupplierReview[];

    constructor() {
        super();
        this._reviews = [];
    }

    public get reviews(): SupplierReview[] {
        return this._reviews;
    }

    public set reviews(value: SupplierReview[]) {
        this._reviews = value;
    }

    public toString(): string {
        let result = super.toString();

        this._reviews.forEach((review) => {
            result = result.concat(`\n${review.toString()}`)
        });

        return result;
    }
}