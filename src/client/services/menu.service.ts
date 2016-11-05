import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class MenuService {
    public isOpen: boolean = false;

    public menuToggled = new Subject();

    constructor() {
    }

    public toggle() {
        this.showMenu(!this.isOpen);
    }

    public showMenu(state: boolean) {
        this.isOpen = state;
        this.menuToggled.next();
        this.updateDom();
    }

    private updateDom() {
        let body = document.getElementsByTagName('body')[0];
        if (body) {
            if (this.isOpen) {
                (body as any).classList.add("body-menu-open-desktop");
            } else {
                (body as any).classList.remove("body-menu-open-desktop");
            }
        }
    }
}