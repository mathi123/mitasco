import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuProvider } from "../../providers/menu.provider";

@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.template.html'
})
export class MenuComponent {
    public isOpen:boolean = true;

    constructor(private menu:MenuProvider) {
        menu.menuToggled.asObservable().subscribe((isOpen:boolean) => {
            this.isOpen = isOpen;
            console.log(isOpen);
        }, err => { console.error(err) });
    }
}