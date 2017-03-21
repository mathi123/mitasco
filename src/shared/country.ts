import { Deserializable, DeserializeUtil } from "deserialize-json-strict";

export class Country implements Deserializable {
    public id: number;
    public name: string;
    public priority: boolean;

    deserialize(obj: any) {
        this.id = DeserializeUtil.StrictNumber(obj.id);
        this.name = DeserializeUtil.StrictString(obj.name);
        this.priority = DeserializeUtil.StrictBoolean(obj.priority);
    }
}