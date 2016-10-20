import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class MenuService {
    private isOpen: boolean = true;

    public menuToggled = new Subject<boolean>();

    constructor() {
    }

    public toggle() {
        this.showMenu(!this.isOpen);
    }

    public showMenu(state: boolean) {
        if (this.isOpen != state) {
            this.isOpen = state;
            this.menuToggled.next(this.isOpen);
        }
    }
}