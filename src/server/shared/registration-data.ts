import { Deserializable, DeserializeUtil } from "deserialize-json-strict";

export class RegistrationData implements Deserializable {
    public email: string;
    public fullName: string;
    public password: string;

    deserialize(obj: any) {
        this.email = DeserializeUtil.StrictString(obj.email);
        this.fullName = DeserializeUtil.StrictString(obj.fullName);
        this.password = DeserializeUtil.StrictString(obj.password);
    }
}