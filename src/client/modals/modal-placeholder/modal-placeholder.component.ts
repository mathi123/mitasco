import { Component, OnInit, ViewContainerRef, ViewChild, Injector, Input } from "@angular/core";
import { ModalService } from "../modal.service";
import { Placeholder } from "./placeholder";

@Component({
    moduleId: module.id,
    selector: 'modal-placeholder',
    templateUrl: 'modal-placeholder.component.html'
})
export class ModalPlaceholderComponent implements OnInit {
    @Input()
    private id: string;

    @ViewChild("modalplaceholder", {read: ViewContainerRef})
    private viewContainerRef: ViewContainerRef;

    constructor(public modalService: ModalService, private injector: Injector) {
    }

    ngOnInit() {
        let placeholder = new Placeholder();
        placeholder.id = this.id;
        placeholder.viewContainerRef = this.viewContainerRef;
        placeholder.injector = this.injector;

        this.modalService.registerPlaceholder(placeholder);
    }
}