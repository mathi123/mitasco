import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Credentials } from "../shared/credentials";
import { QueryConfig } from "pg";
import { DbClient } from "../db-client";
import { TokenPayload } from "../security/token-payload";
import { LoginResult } from "../shared/login-result";
import { UserController } from "./user.controller";
import { PermissionCodeController } from "./permission-code.controller";

export class AuthenticationController {
    private _secretKey: string = "KJ2kjJK32LKJA'/.SD[]";

    public async credentialsAreValid(credentials: Credentials): Promise<boolean> {
        if (credentials === null || credentials === undefined ||
            credentials.password === null || credentials.password === undefined)
            return false;

        let query: QueryConfig = {
            name: "Authentication.GetUser",
            text: `SELECT * FROM users 
            WHERE email = $1`,
            values: [credentials.email]
        };

        let queryResult = await DbClient.Instance().query(query);

        if (queryResult.length == 0) {
            return false;
        } else {
            let isValid = await bcrypt.compareSync(credentials.password, queryResult[0]['password']);

            return isValid;
        }
    }

    public async getUserIdByEmail(email: string): Promise<number> {
        let query: QueryConfig = {
            name: "Authentication.GetUserIdByEmail",
            text: `SELECT id FROM users 
            WHERE email = $1`,
            values: [email]
        };

        let queryResult = await DbClient.Instance().query(query);
        return queryResult[0]['id'];
    }

    public async createToken(userId: number): Promise<string> {
        let permissionController = new PermissionCodeController();
        let payload = new TokenPayload(userId);

        payload.per = await permissionController.getUserPermissionCodes(userId);

        let token = await jwt.sign(payload, this._secretKey);

        return token;
    }

    public async verifyToken(token: string): Promise<TokenPayload> {
        return await jwt.verify(token, this._secretKey);
    }

    public async createLoginResult(email: string): Promise<LoginResult> {
        let userController = new UserController();
        let permissionCodeController = new PermissionCodeController();

        let userId = await this.getUserIdByEmail(email);
        let token = await this.createToken(userId);
        let user = await userController.read(userId);
        let permissionCodes = await permissionCodeController.getUserPermissionCodes(userId);

        let result = new LoginResult();
        result.user = user;
        result.token = token;
        result.permissions = permissionCodes;

        return result;
    }
}