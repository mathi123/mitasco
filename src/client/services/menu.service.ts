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
            this.updateDom();
        }
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