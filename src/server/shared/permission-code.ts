import { Deserializable } from "./deserializable";
import { DeserializeUtil } from "./deserialize-util";

export class PermissionCode implements Deserializable{
    public id:number;
    public code:string;
    public description:string;

    public deserialize(obj: any) {
        this.id = DeserializeUtil.StrictNumber(obj.id);
        this.code = DeserializeUtil.StrictString(obj.code);
        this.description = DeserializeUtil.StrictString(obj.description);
    }
}