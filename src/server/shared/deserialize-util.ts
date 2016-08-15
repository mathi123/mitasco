import { deserializable } from "./deserializable";

export class DeserializeUtil{
    public static StrictString(obj:any):string{
        if(obj === null || obj === undefined){
            throw new KeyNotFoundException();
        }else if(typeof obj != "string"){
            throw new InvalidTypeException();
        }

        return obj as string;
    }
    public static StrictNumber(obj:any):number{
        if(obj === null || obj === undefined){
            throw new KeyNotFoundException();
        }else if(typeof obj != "number"){
            throw new InvalidTypeException();
        }

        return obj as number;
    }
    public static StrictBoolean(obj:any):boolean{
        if(obj === null || obj === undefined){
            throw new KeyNotFoundException();
        }else if(typeof obj != "boolean"){
            throw new InvalidTypeException();
        }

        return obj as boolean;        
    }
    public static StrictStringArray(obj:any):string[]{
        if(obj === null || obj === undefined){
            throw new KeyNotFoundException();
        }else if(obj.constructor !== Array){
            throw new InvalidTypeException();
        }

        (obj as Array<string>).forEach(a => this.StrictString(a));

        return obj as Array<string>;
    }
    public static StrictNumberArray(obj:any):number[]{
        if(obj === null || obj === undefined){
            throw new KeyNotFoundException();
        }else if(obj.constructor !== Array){
            throw new InvalidTypeException();
        }

        (obj as Array<number>).forEach(a => this.StrictNumber(a));

        return obj as Array<number>;
    }
    public static StrictBooleanArray(obj:any):boolean[]{
        if(obj === null || obj === undefined){
            throw new KeyNotFoundException();
        }else if(obj.constructor !== Array){
            throw new InvalidTypeException();
        }

        (obj as Array<boolean>).forEach(a => this.StrictBoolean(a));

        return obj as Array<boolean>;
    }
    public static StrictObjectArray(obj:any, createInstance: () => deserializable):deserializable[]{
        if(obj === null || obj === undefined){
            throw new KeyNotFoundException();
        }else if(obj.constructor !== Array){
            throw new InvalidTypeException();
        }

        let result:Array<deserializable> = [];
        for(let a of obj){
            let b = createInstance();
            b.deserialize(a);
            result.push(b);
        }
        return result;
    }
}

export class KeyNotFoundException{

}

export class InvalidTypeException{

}