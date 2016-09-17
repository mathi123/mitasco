import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class MenuProvider {
    private isOpen:boolean = false;

    private menuToggled = new Subject<boolean>();

    public menuToggledAsync = this.menuToggled.asObservable();

    constructor() { }

    public toggle(){
        this.showMenu(!this.isOpen);
    }

    public showMenu(state:boolean) {
        if(this.isOpen != state){
            this.isOpen = state;
            this.menuToggled.next(this.isOpen);
        }
    }
}