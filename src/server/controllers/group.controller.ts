import { GroupServiceInterface } from "../shared/group-service-interface";
import { Group } from "../shared/group";
import { QueryConfig } from "pg";
import { DbClient } from "../db-client";
import { KeyValuePair } from "../shared/key-value-pair";
import { PermissionCode } from "../shared/permission-code";
import { QueryNames } from "./query-names";

export class GroupController implements GroupServiceInterface{
    public async getAll(): Promise<Group[]> {
        let query: QueryConfig = {
            name: QueryNames.GroupGetAll,
            text: `SELECT a.*, b.permission_count, c.user_count FROM groups a
            JOIN (
                SELECT group_id, COUNT(*) AS permission_count FROM group_permission 
                GROUP BY group_id
            ) b ON a.id = b.group_id
            JOIN (
                SELECT group_id, count(*) AS user_count FROM group_user 
                GROUP BY group_id
            ) c ON a.id = c.group_id
            ORDER BY a.description ASC`
        };

        let result = await DbClient.Instance().query(query);

        return result.map(this.ParseArray);
    }

    public async read(id: number): Promise<Group> {
        // Get group
        let query: QueryConfig = {
            name: QueryNames.GroupGetSingle,
            text: `SELECT * FROM groups WHERE id = $1`,
            values: [id]
        };

        let queryResult = await DbClient.Instance().query(query);
        let result = new Group();
        result.id = queryResult[0]['id'];
        result.description = queryResult[0]['description'];

        // Get users
        query = {
            text: `
            SELECT b.* FROM group_user a
            JOIN users b ON a.user_id = b.id
            WHERE group_id = $1`,
            values: [id]
        };
        queryResult = await DbClient.Instance().query(query);
        result.users = [];
        for(let data of queryResult){
            let user = new KeyValuePair();
            user.key = data['id'];
            user.value = data['fullname'];

            result.users.push(user);
        }
        result.userCount = result.users.length;

        // Get permissions
        query = {
            text: `
            SELECT b.* FROM group_permission a
            JOIN permissioncode b ON a.permissioncode_id = b.id
            WHERE a.group_id = $1`,
            values: [id]
        };
        queryResult = await DbClient.Instance().query(query);
        result.permissionCodes = [];
        for(let data of queryResult){
            let permissionCode = new PermissionCode();
            permissionCode.id = data['id'];
            permissionCode.description = data['description'];
            permissionCode.code = data['code'];

            result.permissionCodes.push(permissionCode);
        }
        result.permissionCount = result.permissionCodes.length;

        return result;
    }

    public async update(group: Group): Promise<boolean> {
        await DbClient.Instance().query("UPDATE groups SET description = $2 WHERE id = $1", [group.id, group.description]);

        let userIds = group.users.map(a => a.key);
        if(userIds.length == 0){
            await DbClient.Instance().query("DELETE FROM group_user WHERE group_id = $1", [group.id]);
        }else{
            await DbClient.Instance().query("DELETE FROM group_user WHERE group_id = $1 AND NOT(user_id = ANY ($2)", [group.id, userIds]);
        }

        let permissionIds = group.permissionCodes.map(a => a.id);
        if(permissionIds.length == 0){
            await DbClient.Instance().query("DELETE FROM group_permission WHERE group_id = $1", [group.id]);
        }else{
            await DbClient.Instance().query("DELETE FROM group_permission WHERE group_id = $1 AND NOT (permissioncode_id = ANY ($2))", [group.id, group.permissionCodes.map(a => a.id)]);
        }
        //await DbClient.Instance().query("");

        //await DbClient.Instance().query("");

        // TODO insert new users

        // TODO insert new permissions

        return true;
    }

    public async create(group: Group): Promise<boolean> {
        let query: QueryConfig = {
            text: `INSERT INTO groups (description) VALUES ($1) RETURNING id`,
            values: [group.description]
        };

        let result = await DbClient.Instance().query(query);

        return result[0]['id'];
    }

    public async remove(id: number): Promise<boolean> {
        let query: QueryConfig = {
            text: `DELETE FROM groups WHERE id = $1`,
            values: [id]
        };

        await DbClient.Instance().query(query);

        return true;
    }

    private ParseArray(row:any):Group{
        let rec = new Group();
        rec.id = row['id'];
        rec.description = row['description'];
        rec.userCount = row['user_count'];
        rec.permissionCount = row['permission_count'];
        return rec;
    }
}