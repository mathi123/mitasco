import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionComponent } from "./accordion/accordion.component";
import { SuggestionInputComponent } from "./suggestion-input/suggestion-input.component";
import { FormsModule } from "@angular/forms";
import { AccordionGroupComponent } from "./accordion/accordion-group.component";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [AccordionComponent, AccordionGroupComponent, SuggestionInputComponent],
    exports: [CommonModule, FormsModule, AccordionComponent, AccordionGroupComponent, SuggestionInputComponent]
})
export class WidgetModule {

}