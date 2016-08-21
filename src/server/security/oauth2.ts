import { DbClient } from "../db-client";
import { QueryConfig } from "pg";
import { AccessToken } from "./access-token";
import { Client } from "./client";
import { RefreshToken } from "./refresh-token";

export class OAuth2 {
    private authorizedClientIds = ['abc1', 'def2'];

    public async getAccessToken(bearerToken: string): Promise<AccessToken> {
        let query: QueryConfig = {
            name: "OAuth2.GetAccessToken",
            text: `SELECT access_token, client_id, expires, user_id FROM oauth_access_tokens 
            WHERE access_token = $1`,
            values: [bearerToken]
        };

        let result = await DbClient.Instance().query(query);
        var token = result.rows[0];
        var toReturn = new AccessToken();
        toReturn.accessToken = token.access_token;
        toReturn.clientId = token.client_id;
        toReturn.expires = new Date(token.expires);
        toReturn.userId = token.user_id;
        return toReturn;
    }

    public async getClient(clientId: string): Promise<Client> {
        let query: QueryConfig = {
            name: "OAuth2.GetClient",
            text: `SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE
            client_id = $1`,
            values: [clientId]
        };

        let result = await DbClient.Instance().query(query);
        var client = result[0];

        /* if (clientSecret !== null && client.client_secret !== clientSecret) return callback();*/

        var toReturn = new Client();
        toReturn.clientId = result.client_id;
        toReturn.clientSecret = result.client_secret;
        return toReturn;
    }

    public async getRefreshToken(bearerToken: string): Promise<RefreshToken> {
        let query: QueryConfig = {
            name: "OAuth2.GetRefreshToken",
            text: `SELECT refresh_token, client_id, expires, user_id FROM oauth_refresh_tokens
            WHERE refresh_token = $1`,
            values: [bearerToken]
        };

        let result = await DbClient.Instance().query(query);
        var token = result[0];
        var toReturn = new RefreshToken();
        toReturn.refreshToken = token.refresh_token;
        toReturn.clientId = token.client_id;
        toReturn.expires = new Date(token.expires);
        toReturn.userId = token.userId;
        return toReturn;
    }

    public grantTypeAllowed(clientId: string, grantType: string):boolean {
        // This will very much depend on your setup, I wouldn't advise doing anything exactly like this but
        // it gives an example of how to use the method to resrict certain grant types
        if (grantType === 'password') {
            return this.authorizedClientIds.indexOf(clientId.toLowerCase()) >= 0;
        }
        return false;
    }

    public async saveAccessToken(accessToken:string, clientId:string, expires:Date, userId:number){
        let query: QueryConfig = {
            name: "OAuth2.SaveAccessToken",
            text: `INSERT INTO oauth_access_tokens(access_token, client_id, user_id, expires) 
            VALUES ($1, $2, $3, $4)`,
            values: [accessToken, clientId, userId, expires]
        };

        await DbClient.Instance().query(query);
    }

    public async saveRefreshToken(refreshToken:string, clientId:string, expires:Date, userId:number){
        let query: QueryConfig = {
            name: "OAuth2.SaveRefreshToken",
            text: `INSERT INTO oauth_access_tokens(access_token, client_id, user_id, expires) 
            VALUES ($1, $2, $3, $4)`,
            values: [refreshToken, clientId, userId, expires]
        };

        await DbClient.Instance().query(query);
    }

    public async getUser(email:string, password:string):Promise<number>{
        let query: QueryConfig = {
            name: "OAuth2.GetUser",
            text: `SELECT id FROM users WHERE email = $1 AND password = $2`,
            values: [email, password]
        };

        var result = await DbClient.Instance().query(query);
        return result[0];
    }
}