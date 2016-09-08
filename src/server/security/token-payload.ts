export class TokenPayload{
    public sub:number;
    public exp:Date;
    public per:string[];

    constructor(userId:number){
        this.sub = userId;
    }
}