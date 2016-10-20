import { NgModule } from "@angular/core/src/metadata/ng_module";
import { LanguageListComponent } from "./language/language-list.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [LanguageListComponent],
    exports: [LanguageListComponent, CommonModule]
})
export class AdminModule {

}