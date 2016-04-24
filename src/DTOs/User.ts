export class User {
    public id: number;
    public email: string;
    public fullname: string;

    constructor() {

    }

    public toString(): string {
        return `${this.email} (${this.fullname})`;
    }
}