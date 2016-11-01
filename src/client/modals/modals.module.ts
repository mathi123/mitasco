import { NgModule } from "@angular/core";
import { ModalPlaceholderComponent } from "./modal-placeholder/modal-placeholder.component";
import { ModalService } from "./modal.service";

@NgModule({
    declarations: [ModalPlaceholderComponent],
    providers: [ModalService],
    exports: [ModalPlaceholderComponent]
})
export class ModalsModule {

}