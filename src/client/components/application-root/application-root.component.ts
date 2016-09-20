import { Component } from '@angular/core';
import { MenuProvider } from "../../providers/menu.provider";
import { UrlTrackingService } from "../../services/url-tracking.service";

@Component({
    moduleId: module.id,
    selector: 'application-root',
    templateUrl: 'application-root.template.html'
})
export class ApplicationRootComponent {
    constructor(private menu:MenuProvider, private urlTracker:UrlTrackingService){
    }

    public toggleMenu(){
        this.menu.toggle();
    }
}