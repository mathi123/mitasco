export interface ISerializable{
    serialize() : string;
    deserialize(json:string);
}