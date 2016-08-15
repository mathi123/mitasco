import { deserializable } from "./deserializable";
export class Company implements deserializable{
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

    public deserialize(values: any) {
        this.id = values.id;
        this.name = values.name;
        this.email = values.email;
        this.phone = values.phone;
        this.fax = values.fax;
        this.gsm = values.gsm;
        this.isCustomer = values.isCustomer;
        this.isSupplier = values.isSupplier;
        this.isCompetitor = values.isCompetitor;
        this.vat = values.vat;
    }
}
