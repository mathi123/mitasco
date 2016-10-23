import { Component } from "@angular/core";
import { MenuService } from "../../services/menu.service";
import { UrlTrackingService } from "../../services/url-tracking.service";

@Component({
    moduleId: module.id,
    selector: 'application-root',
    templateUrl: 'application-root.component.html'
})
export class ApplicationRootComponent {
    constructor(private menu: MenuService, private urlTracker: UrlTrackingService) {
    }

    public toggleMenu() {
        this.menu.toggle();
    }
}