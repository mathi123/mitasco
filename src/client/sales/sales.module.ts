import { NgModule } from "@angular/core";
import { SalesModuleRouting } from "./sales-routing.module";
import { WidgetModule } from "../widgets/widget.module";
import { CommonModule } from "@angular/common";
import { AddressBookComponent } from "./addressbook/addressbook.component";
import { RouterModule } from "@angular/router";
import { ServicesModule } from "../server-api/services.module";

@NgModule({
    imports: [CommonModule, WidgetModule, SalesModuleRouting, ServicesModule],
    declarations: [AddressBookComponent],
    exports: [RouterModule]
})
export class SalesModule {
}