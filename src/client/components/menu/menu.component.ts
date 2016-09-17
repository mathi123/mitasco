import { Component, OnInit } from '@angular/core';
import { MenuProvider } from "../../providers/menu.provider";

@Component({
    moduleId: module.id,
    selector: 'menu',
    template: `
        <nav [class.open]="isOpen" [hidden]="!isOpen"
             [class.closed]="!isOpen">
            <accordion>
                <accordion-group heading="Algemeen" isGroupOpen="true">
                    <ul>
                        <li><p routerLink="/todo-list">Todo's</p></li>
                    </ul>
                </accordion-group>
                <accordion-group heading="Admin" isGroupOpen="true">
                    <ul>
                        <li><p routerLink="/group-list">Groepen</p></li>
                        <li><p>Gebruikers</p></li>
                        <li><p>Permissies</p></li>
                    </ul>
                </accordion-group>
            </accordion>
        </nav>
    `
})
export class MenuComponent implements OnInit {
    public isOpen:boolean = true;

    constructor(private menu:MenuProvider) {
        menu.menuToggledAsync.subscribe((isOpen:boolean) => {
            this.isOpen = isOpen;
        });
    }

    ngOnInit() { }

}