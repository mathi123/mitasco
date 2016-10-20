import { Component } from "@angular/core";
import { MenuService } from "../../services/menu.service";

@Component({
    moduleId: module.id,
    selector: 'application-root',
    templateUrl: 'application-root.component.html'
})
export class ApplicationRootComponent {
    constructor(private menu: MenuService) {
    }

    public toggleMenu() {
        this.menu.toggle();
    }
}