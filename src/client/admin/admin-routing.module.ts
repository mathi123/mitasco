import { Routes, RouterModule } from "@angular/router";
import { LanguageListComponent } from "./language/language-list.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: 'language-list',
        component: LanguageListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}