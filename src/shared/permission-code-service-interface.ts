import { PermissionCode } from "./permission-code";
export interface PermissionCodeServiceInterface {
    getAll(): Promise<PermissionCode[]>;
    read(id: number): Promise<PermissionCode>;
    update(permissionCode: PermissionCode): Promise<boolean>;
    create(permissionCode: PermissionCode): Promise<number>;
    remove(id: number): Promise<boolean>;
}