import { ISerializable } from "./ISerializable";
export class Todo implements ISerializable{
    public id: number = 0;
    public description: string = "";
    public isDone: boolean = false;
    
    constructor(){
        
    }
    
    public toString(): string {
        return this.description;
    }

    public serialize(): string {
        return JSON.stringify(this);
    }

    public deserialize(json: string) {
        let values = JSON.parse(json);

        this.id = values.id;
        this.description = values.description;
        this.isDone = values.isDone;
    }
}
