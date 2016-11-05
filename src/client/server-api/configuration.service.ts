import { Injectable } from "@angular/core";
import { Headers, RequestOptions } from "@angular/http";

@Injectable()
export class ConfigurationService {
    private _baseUrl: string = 'https://localhost:3000';
    private _headers: Headers = new Headers();
    private _options: RequestOptions = new RequestOptions();
    private _token: string;
    private _isLoggedIn: boolean = false;
    public TOKENHEADER: string = 'token';

    public constructor() {
        this._headers.append('Content-Type', 'application/json');
        this._options.headers = this._headers;
    }

    public getBaseUrl(): string {
        return `${this._baseUrl}/api`;
    }

    public getDocumentationUrl(): string {
        let swaggerUrl = `${this._baseUrl}/documentation/swagger.yml`;
        return `${this._baseUrl}/documentation/index.html?url=${encodeURIComponent(swaggerUrl)}#/default`;
    }

    public getHttpOptions(): RequestOptions {
        return this._options;
    }

    public setToken(token: string) {
        console.log("token was received");
        this._token = token;
        this.addTokenToHeaders();
        this._isLoggedIn = true;
    }

    public isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    private addTokenToHeaders() {
        if (this._headers.has(this.TOKENHEADER)) {
            this._headers.delete(this.TOKENHEADER);
        }
        this._headers.append(this.TOKENHEADER, this._token);
    }
}

