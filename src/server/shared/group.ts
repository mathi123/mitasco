import { KeyValuePair } from "./key-value-pair";
import { PermissionCode } from "./permission-code";
import { Deserializable } from "./deserializable";
import { DeserializeUtil } from "./deserialize-util";

export class Group implements Deserializable{
    public id:number;
    public description:string;
    public userCount:number;
    public permissionCount:number;
    public users:KeyValuePair[];
    public permissionCodes:PermissionCode[];

    public deserialize(obj: any){
        this.id = DeserializeUtil.StrictNumber(obj.id);
        this.description = DeserializeUtil.StrictString(obj.description);
        this.users = DeserializeUtil.StrictObjectArray(obj.users, () => new KeyValuePair()) as KeyValuePair[];
        this.permissionCodes = DeserializeUtil.StrictObjectArray(obj.permissionCodes, () => new PermissionCode()) as PermissionCode[];
    }
}