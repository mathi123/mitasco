import { SortDirection } from "./sort-direction";

export class SearchArgument {
    public query: string;
    public skip: number;
    public take: number;
    public sortDirection: SortDirection;
    public sortColumn: string;

    constructor() {
        this.query = '';
        this.skip = 0;
        this.take = 20;
        this.sortDirection = SortDirection.Acscending;
        this.sortColumn = '';
    }
}
