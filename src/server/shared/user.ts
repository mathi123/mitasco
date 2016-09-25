import { Deserializable,DeserializeUtil } from "deserialize-json-strict";

export class User implements Deserializable{
    public id: number;
    public email: string;
    public fullname: string;

    constructor() {

    }

    public toString(): string {
        return `${this.email} (${this.fullname})`;
    }

    public deserialize(obj: any) {
        this.id = DeserializeUtil.StrictNumber(obj.id);
        this.email = DeserializeUtil.StrictString(obj.email);
        this.fullname = DeserializeUtil.StrictString(obj.fullname);
    }
}
