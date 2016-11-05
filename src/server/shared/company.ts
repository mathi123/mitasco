import { Deserializable, DeserializeUtil } from "deserialize-json-strict";
import { Country } from "./country";

export class Company implements Deserializable {
    public id: number;
    public name: string;
    public email: string;
    public phone: string;
    public fax: string;
    public cell: string;
    public url: string;
    public street: string;
    public zip: string;
    public city: string;
    public country: Country;

    constructor() {
    }

    public deserialize(values: any) {
        this.id = DeserializeUtil.StrictNumber(values.id);
        this.name = DeserializeUtil.StrictString(values.name);
        this.email = DeserializeUtil.StrictString(values.email);
        this.phone = DeserializeUtil.StrictString(values.phone);
        this.fax = DeserializeUtil.StrictString(values.fax);
        this.cell = DeserializeUtil.StrictString(values.cell);
        this.url = DeserializeUtil.StrictString(values.url);
        this.street = DeserializeUtil.StrictString(values.street);
        this.zip = DeserializeUtil.StrictString(values.zip);
        this.city = DeserializeUtil.StrictString(values.city);

        if (values.country) {
            this.country = new Country();
            this.country.deserialize(values.country);
        }
    }
}
