export class TokenPayload{
    public sub:number;
    public exp:Date;

    constructor(userId:number){
        this.sub = userId;
    }
}