import { Component, OnDestroy, Input } from '@angular/core';
import { AccordionComponent } from "./accordion.component";

@Component({
    moduleId: module.id,
    selector: 'accordion-group',
    template:
        `
    <div class="accordion-group" [ngClass]="{'accordion-group-open': isOpen}">
      <div class="accordion-group-heading" (click)="toggleOpen()" [ngClass]="{'accordion-group-heading-open': isOpen}">
        <div class="arrow-up" [hidden]="!isOpen"></div>
        <div class="arrow-down" [hidden]="isOpen"></div>
        <p class="accordion-group-title">{{heading}}</p>
      </div>
      <div class="accordion-group-collapse" [hidden]="!isOpen">
        <div class="accordion-group-body">
            <ng-content></ng-content>
        </div>
      </div>
    </div>
    `
})
export class AccordionGroupComponent implements OnDestroy {
    private _isOpen:boolean = false;

    @Input() heading: string;

    @Input()
    set isOpen(value: boolean) {
        this._isOpen = value;
        if (value) {
            this.accordion.closeOthers(this);
        }
    }

    get isOpen() {
        return this._isOpen;
    }

    constructor(private accordion: AccordionComponent) {
        this.accordion.addGroup(this);
    }

    ngOnDestroy() {
        this.accordion.removeGroup(this);
    }

    toggleOpen(): void {
        this.isOpen = !this.isOpen;
    }
}