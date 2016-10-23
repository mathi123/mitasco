import { LanguageListComponent } from "./language/language-list.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminRoutingModule } from "./admin-routing.module";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
    imports: [CommonModule, AdminRoutingModule],
    declarations: [LanguageListComponent, DashboardComponent],
    exports: [CommonModule, RouterModule]
})
export class AdminModule {

}