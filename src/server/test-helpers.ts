import { User } from "../client/shared/user";
import { UserController } from "./controllers/user.controller";
import { GroupController } from "./controllers/group.controller";
import { Permissions } from "./security/permissions";
import { KeyValuePair } from "./shared/key-value-pair";
import { PermissionCodeController } from "./controllers/permission-code.controller";
import { PermissionCode } from "./shared/permission-code";
import { Group } from "./shared/group";
export class TestHelpers{
    public static async CreateUser():Promise<User>{
        let controller = new UserController();
        let user = new User();
        user.email = Math.random() + "@gmail.com";
        user.fullname = "test user";

        let id = await controller.create(user, "test");
        user.id = id;
        return user;
    }
    public static async CreateAdminUser():Promise<User>{
        let user = await this.CreateUser();
        let userKv = new KeyValuePair();
        userKv.key = user.id;
        userKv.value = user.fullname;

        let controller = new GroupController();
        let groups = await controller.getAll();
        let found = false;

        for(let group of groups){
            if(found) break;

            for(let perm of group.permissionCodes){
                if(found) break;

                if(perm.code == Permissions.Admin){
                    found = true;

                    group.users.push(userKv);
                    await controller.update(group);
                }
            }
        }

        if(!found) {
            // No group with admin permissions?!
            let groupController = new GroupController();
            let permissions: PermissionCode[] = await(new PermissionCodeController()).getAll();
            for (let perm of permissions) {
                if (perm.code == Permissions.Admin) {
                    let adminGroup = new Group();
                    adminGroup.description = Math.random() + "testgroup";

                    let id = await groupController.create(adminGroup);
                    adminGroup.id = id;
                    adminGroup.users = [userKv];
                    adminGroup.permissionCodes = [perm];
                    await groupController.update(adminGroup);
                    break;
                }
            }
        }

        return user;
    }

}