import { User } from "./user";

export class LoginResult {
    public token: string;
    public user: User;
    public permissions: string[];
}