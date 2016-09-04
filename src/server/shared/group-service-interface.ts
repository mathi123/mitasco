import { Group } from "./group";
export interface GroupServiceInterface{
    getAll():Promise<Group[]>;
    read(id:number):Promise<Group>;
    update(group:Group):Promise<boolean>;
    create(group:Group):Promise<boolean>;
    remove(id:number):Promise<boolean>;
}