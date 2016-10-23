import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccordionComponent } from "./accordion/accordion.component";
import { SuggestionInputComponent } from "./suggestion-input/suggestion-input.component";

@NgModule({
    imports: [CommonModule],
    declarations: [AccordionComponent, SuggestionInputComponent],
    exports: [CommonModule, AccordionComponent, SuggestionInputComponent]
})
export class WidgetModule {

}