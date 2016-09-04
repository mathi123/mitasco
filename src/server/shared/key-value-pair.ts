import { Deserializable } from "./deserializable";
import { DeserializeUtil } from "./deserialize-util";

export class KeyValuePair implements Deserializable{
    public key:number;
    public value:string;

    public deserialize(obj:any){
        this.key = DeserializeUtil.StrictNumber(obj.key);
        this.value = DeserializeUtil.StrictString(obj.value);
    }
}