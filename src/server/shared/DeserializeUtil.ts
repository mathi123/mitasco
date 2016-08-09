
export class DeserializeUtil{
    public static StrictString(obj:any) : string{
        if(obj == null || obj == undefined){
            throw new KeyNotFoundException();
        }else if(typeof obj !== "string"){
            throw new InvalidTypeException();
        }

        return obj as string;
    }
    public static StrictNumber(obj:any) : number{
        if(obj == null || obj == undefined){
            throw new KeyNotFoundException();
        }else if(typeof obj !== "number"){
            throw new InvalidTypeException();
        }

        return obj as number;
    }
}

export class KeyNotFoundException{

}

export class InvalidTypeException{

}