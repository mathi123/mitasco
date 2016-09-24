import { Injectable } from '@angular/core';
import { GroupServiceInterface } from "../shared/group-service-interface";
import { Group } from "../shared/group";
import { Http, Response } from "@angular/http";
import { ConfigurationProvider } from "../providers/configuration.provider";

@Injectable()
export class GroupService implements GroupServiceInterface{

    constructor(private http:Http, private config:ConfigurationProvider) { }

    getAll(): Promise<Group[]> {
        return this.http.get(`${this.config.getBaseUrl()}/group`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as Group[])
            .catch((err: Error) => console.log(err));
    }

    read(id: number): Promise<Group> {
        return this.http.get(`${this.config.getBaseUrl()}/group/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as Group)
            .catch((err: Error) => console.log(err));
    }

    update(group: Group): Promise<boolean> {
        return this.http.post(`${this.config.getBaseUrl()}/group`, JSON.stringify(group), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }

    create(group: Group): Promise<number> {
        return this.http.put(`${this.config.getBaseUrl()}/group`, JSON.stringify(group), this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as number)
            .catch((err: Error) => console.log(err));
    }

    remove(id: number): Promise<boolean> {
        return this.http.delete(`${this.config.getBaseUrl()}/group/${id}`, this.config.getHttpOptions())
            .toPromise()
            .then((r: Response) => r.json() as boolean)
            .catch((err: Error) => console.log(err));
    }
}