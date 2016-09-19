import { Component } from '@angular/core';
import { MenuProvider } from "../../providers/menu.provider";

@Component({
    selector: 'application-root',
    templateUrl: 'application-root.template.html'
})
export class ApplicationRootComponent {
    constructor(private menu:MenuProvider){
    }

    public toggleMenu(){
        this.menu.toggle();
    }
}