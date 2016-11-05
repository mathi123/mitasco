import { Injectable } from "@angular/core";
import { User } from "../shared/user";
import { LoginResult } from "../shared/login-result";

@Injectable()
export class UserSettingsService {
    private loggedUser: User;
    private permissions: string[];

    constructor() {
    }

    initialize(loginResult: LoginResult) {
        this.loggedUser = loginResult.user;
        this.permissions = loginResult.permissions;
    }

    getUser() {
        return this.loggedUser;
    }

    getPermissions() {
        return this.permissions;
    }
}