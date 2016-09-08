import { Injectable } from "@angular/core";
import { Headers, RequestOptionsArgs } from "@angular/http";

@Injectable()
export class ConfigurationProvider{
    private _baseUrl: string = 'https://localhost:3000/api';
    private _headers: Headers = new Headers();
    private _options: RequestOptionsArgs = new RequestOptionsArgs();
    private _token:string;
    public TOKENHEADER: string = 'token';

    public constructor(){
        this._headers.append('Content-Type', 'application/json');
        this._options.headers = this._headers;
    }

    public getBaseUrl():string{
        return this._baseUrl;
    }

    public getHttpOptions():RequestOptionsArgs{
        return this._options;
    }

    public setToken(token: string) {
        this._token = token;
        this.addTokenToHeaders();
    }

    private addTokenToHeaders(){
        if(this._headers.has(this.TOKENHEADER)){
            this._headers.delete(this.TOKENHEADER);
        }
        this._headers.append(this.TOKENHEADER, this._token);
    }
}

