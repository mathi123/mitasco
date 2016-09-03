import { PermissionCode } from "./permission-code";
export interface PermissionCodeInterface{
    getAll():Promise<PermissionCode[]>;
    read(id:number):Promise<PermissionCode>;
    update(permissionCode:PermissionCode):Promise<boolean>;
    create(permissionCode:PermissionCode):Promise<boolean>;
    remove(id:number):Promise<boolean>;
}