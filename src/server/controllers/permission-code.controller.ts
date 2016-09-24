import { PermissionCodeServiceInterface } from "../shared/permission-code-service-interface";
import { PermissionCode } from "../shared/permission-code";
import { QueryConfig } from "pg";
import { DbClient } from "../db-client";

export class PermissionCodeController implements PermissionCodeServiceInterface{
    public async getAll(): Promise<PermissionCode[]> {
        let query: QueryConfig = {
            text: `SELECT * FROM permissioncode ORDER BY code ASC`
        };

        let result = await DbClient.Instance().query(query);

        return result.map(this.ParseArray);
    }

    public async read(id: number): Promise<PermissionCode> {
        let query: QueryConfig = {
            text: `SELECT * FROM permissioncode WHERE id = $1`,
            values: [id]
        };

        let result = await DbClient.Instance().query(query);

        return this.ParseArray(result[0]);
    }

    public async remove(id: number): Promise<boolean> {
        let query: QueryConfig = {
            text: `DELETE FROM permissioncode WHERE id = $1`,
            values: [id]
        };

        await DbClient.Instance().query(query);

        return true;
    }

    public async update(permissionCode: PermissionCode): Promise<boolean> {
        let query: QueryConfig = {
            text: `UPDATE permissioncode SET description = $2,code= $3 WHERE id = $1`,
            values: [permissionCode.id, permissionCode.description, permissionCode.code]
        };

        await DbClient.Instance().query(query);

        return true;
    }

    public async create(permissionCode: PermissionCode): Promise<number> {
        let query: QueryConfig = {
            text: `INSERT INTO permissioncode (code, description) VALUES ($1,$2) RETURNING id`,
            values: [permissionCode.code, permissionCode.description]
        };

        let result = await DbClient.Instance().query(query);

        return result[0]['id'];
    }

    private ParseArray(row:any):PermissionCode{
        let rec = new PermissionCode();
        rec.id = row['id'];
        rec.description = row['description'];
        rec.code = row['code'];
        return rec;
    }
}