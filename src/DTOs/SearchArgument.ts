
export enum SortDirection {
    Acscending,
    Descending
}

export class SearchArgument {
    public query: string;
    public skip: number;
    public take: number;
    public sortDirection: SortDirection;
    public sortColumn: string;

    constructor() {

    }
}