import { Credentials } from "../shared/credentials";
import * as bcrypt from "bcrypt";
import { QueryConfig } from "pg";
import { DbClient } from "../db-client";

export class AuthenticationController{
    public async isValid(credentials:Credentials):Promise<boolean>{
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
}