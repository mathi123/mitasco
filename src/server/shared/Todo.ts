import { Deserializable } from "./deserializable";
import { DeserializeUtil } from "./deserialize-util";

export class Todo implements Deserializable{
    public id: number = 0;
    public description: string = "";
    public isDone: boolean = false;
    
    constructor(){
        
    }
    
    public toString(): string {
        return this.description;
    }

    public deserialize(values:any) {
        this.id = DeserializeUtil.StrictNumber(values.id);
        this.description = DeserializeUtil.StrictString(values.description);
        this.isDone = DeserializeUtil.StrictBoolean(values.isDone);
    }
}
