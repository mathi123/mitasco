export class CompanyTag {
    public id: number;
    public tag: string;

    constructor() {

    }

    public validate(): boolean {
        if (this.tag) {
            return this.tag.length > 2;
        } else {
            return false;
        }
    }
}