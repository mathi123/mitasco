export class CompanyTag {
    private _id: number;
    private _tag: string;

    constructor(id: number, tag: string) {
        this._id = id;
        this._tag = tag;
    }

    public get id(): number {
        return this._id;
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(value: string) {
        this._tag = value;
    }

    public validate(): boolean {
        if (this._tag) {
            return this._tag.length > 2;
        } else {
            return false;
        }
    }
}
