import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressBookComponent } from "./addressbook/addressbook.component";

const routes: Routes = [
    {
        path: 'sales',
        children: [
            {path: 'addressbook', component: AddressBookComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class SalesModuleRouting {
}