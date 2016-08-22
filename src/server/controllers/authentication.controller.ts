import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Credentials } from "../shared/credentials";
import { QueryConfig } from "pg";
import { DbClient } from "../db-client";
import { TokenPayload } from "../security/token-payload";

export class AuthenticationController{
    private _secretKey:string = "KJ2kjJK32LKJA'/.SD[]";

    public async credentialsAreValid(credentials:Credentials):Promise<boolean>{
        if(credentials === null || credentials === undefined ||
            credentials.password === null || credentials.password === undefined)
            return false;

        let query: QueryConfig = {
            name: "Authentication.GetUser",
            text: `SELECT * FROM users 
            WHERE email = $1`,
            values: [credentials.email]
        };

        let queryResult = await DbClient.Instance().query(query);

        if(queryResult.length == 0){
            return false;
        }else{
            let isValid = await bcrypt.compareSync(credentials.password, queryResult[0]['password']);

            return isValid;
        }
    }
    public async getUserIdByEmail(email:string){
        let query: QueryConfig = {
            name: "Authentication.GetUserIdByEmail",
            text: `SELECT id FROM users 
            WHERE email = $1`,
            values: [email]
        };

        let queryResult = await DbClient.Instance().query(query);
        return queryResult[0]['id'];
    }
    public async createToken(userId:number):Promise<string>{
        let payload = new TokenPayload(userId);
        let token = await jwt.sign(payload, this._secretKey);

        return token;
    }
    public async verifyToken(token:string):Promise<TokenPayload>{
        return await jwt.verify(token, this._secretKey);
    }
}