import { Component } from '@angular/core';
import { AccordionGroupComponent } from "./accordion-group.component";

@Component({
    moduleId: module.id,
    selector: 'accordion',
    template: `
    <div class="accordion">
        <ng-content></ng-content>
    </div>
    `,
    styleUrls: ['../../styles/accordion-component.css']
})
export class AccordionComponent{
    groups: Array<AccordionGroupComponent> = [];

    addGroup(group: AccordionGroupComponent): void {
        this.groups.push(group);
    }

    closeOthers(openGroup: AccordionGroupComponent): void {
        this.groups.forEach((group: AccordionGroupComponent) => {
            if (group !== openGroup) {
                group.isOpen = false;
            }
        });
    }

    removeGroup(group: AccordionGroupComponent): void {
        const index = this.groups.indexOf(group);
        if (index !== -1) {
            this.groups.splice(index, 1);
        }
    }
}