import { NgModule } from "@angular/core";
import { ModalPlaceholderComponent } from "./modal-placeholder/modal-placeholder.component";
import { ModalService } from "./modal.service";
import { YesNoDialogComponent } from "./yes-no-dialog/yes-no-dialog-component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [ModalPlaceholderComponent, YesNoDialogComponent],
    providers: [ModalService],
    exports: [ModalPlaceholderComponent, YesNoDialogComponent]
})
export class ModalsModule {

}