import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";

@Injectable()
export class ConfigurationProvider{
    private _baseUrl: string = 'https://localhost:3000/api';
    private _headers: Headers = new Headers();
    private _options: RequestOptions = new RequestOptions();
    private _token:string;
    public TOKENHEADER: string = 'token';

    public constructor(){
        this._headers.append('Content-Type', 'application/json');
        this._options.headers = this._headers;
    }

    public getBaseUrl():string{
        return this._baseUrl;
    }

    public getHttpOptions():RequestOptions{
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

