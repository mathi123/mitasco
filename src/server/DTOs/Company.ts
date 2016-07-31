export class Company {
    public id: number;
    public name: string;
    public email: string;
    public phone: string;
    public fax: string;
    public gsm: string;
    public isCustomer: boolean;
    public isSupplier: boolean;
    public isCompetitor: boolean;
    public vat: string;

    constructor() {

    }

    public validate(): boolean {
        if (this.name) {
            return this.name.length > 3;
        }
        else {
            return false;
        }
    }

    public toString(): string {
        let nummer: string = "";

        if (this.gsm) {
            nummer = ` (${this.gsm})`
        }
        else if (this.phone) {
            nummer = ` (${this.phone})`;
        }

        return this.name + nummer;
    }
}