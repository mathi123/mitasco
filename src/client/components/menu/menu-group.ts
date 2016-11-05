import { MenuItem } from "./menu-item";
export class MenuGroup {
    public description: string;
    public items: MenuItem[];

    public constructor() {
        this.items = [];
    }

    public add(item: MenuItem) {
        this.items.push(item);
    }
}