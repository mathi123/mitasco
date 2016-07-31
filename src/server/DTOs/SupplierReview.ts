export class SupplierReview {
    public rating: number;
    public message: string;

    constructor() {

    }

    public toString(): string {
        return `${this.rating} - ${this.message}`;
    }
}
