export class Todo {
    public id: number;
    public description: string;
    public isDone: boolean;

    constructor() {

    }

    public toString(): string {
        return this.description;
    }
}
