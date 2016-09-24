import { PermissionCodeServiceInterface } from "../shared/permission-code-service-interface";
import { PermissionCode } from "../shared/permission-code";
import { Http, Response } from "@angular/http";
import { ConfigurationProvider } from "../providers/configuration.provider";
import { Injectable } from "@angular/core";

@Injectable()
export class PermissionCodeService implements PermissionCodeServiceInterface{

    constructor(private http:Http, private config:ConfigurationProvider){

    }

    getAll(): Promise<PermissionCode[]> {
        return this.http.get(`${this.config.getBaseUrl()}/permissioncode`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as PermissionCode[])
            .catch((err: Error) => console.log(err));
    }

    read(id: number): Promise<PermissionCode> {
        return this.http.get(`${this.config.getBaseUrl()}/permissioncode/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as PermissionCode)
            .catch((err: Error) => console.log(err));
    }

    update(permissionCode: PermissionCode): Promise<boolean> {
        return this.http.post(`${this.config.getBaseUrl()}/permissioncode`, JSON.stringify(permissionCode), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

    create(permissionCode: PermissionCode): Promise<number> {
        return this.http.put(`${this.config.getBaseUrl()}/permissioncode`, JSON.stringify(permissionCode), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as number)
            .catch((err: Error) => console.log(err));
    }

    remove(id: number): Promise<boolean> {
        return this.http.delete(`${this.config.getBaseUrl()}/permissioncode/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

}