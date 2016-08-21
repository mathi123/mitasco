import { Deserializable } from "./deserializable";
import { DeserializeUtil } from "./deserialize-util";
export class Credentials implements Deserializable{
    public email:string;
    public password:string;
    
    public deserialize(obj: any) {
        this.email = DeserializeUtil.StrictString(obj.email);
        this.password = DeserializeUtil.StrictString(obj.password);
    }
}