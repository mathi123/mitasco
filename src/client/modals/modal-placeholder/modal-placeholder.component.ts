import { Component, OnInit, ViewContainerRef, ViewChild, Injector } from "@angular/core";
import { ModalService } from "../modal.service";

@Component({
    moduleId: module.id,
    selector: 'modal-placeholder',
    templateUrl: 'modal-placeholder.component.html'
})
export class ModalPlaceholderComponent implements OnInit {
    @ViewChild("modalplaceholder", {read: ViewContainerRef})
    private viewContainerRef: ViewContainerRef;

    constructor(private modalService: ModalService, private injector: Injector) {
    }

    ngOnInit() {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}