import { Company } from "./Company";
import { SupplierReview } from "./SupplierReview";

export class Supplier extends Company {
    public reviews: SupplierReview[];

    constructor() {
        super();
        this.reviews = [];
    }

    public toString(): string {
        let result = super.toString();

        this.reviews.forEach((review) => {
            result = result.concat(`\n${review.toString()}`)
        });

        return result;
    }
}
