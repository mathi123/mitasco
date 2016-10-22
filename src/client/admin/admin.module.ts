import { LanguageListComponent } from "./language/language-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [CommonModule, AdminRoutingModule],
    declarations: [LanguageListComponent],
    exports: [LanguageListComponent, CommonModule, RouterModule]
})
export class AdminModule {

}