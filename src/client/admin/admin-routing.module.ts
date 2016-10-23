import { Routes, RouterModule } from "@angular/router";
import { LanguageListComponent } from "./language/language-list.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    {
        path: 'admin',
        children: [{
            path: 'language-list',
            component: LanguageListComponent
        }, {
            path: '**',
            component: DashboardComponent
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class AdminRoutingModule {
}