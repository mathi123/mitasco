import { Component, OnInit, ComponentRef } from "@angular/core";
import { GroupService } from "../../server-api/group.service";
import { Group } from "../../shared/group";
import { Router } from "@angular/router";
import { ConfigurationService } from "../../server-api/configuration.service";
import { ModalsModule } from "../../modals/modals.module";
import { YesNoDialogComponent } from "../../modals/yes-no-dialog/yes-no-dialog-component";
import { DialogResult } from "../../modals/yes-no-dialog/dialog-result";
import { ModalService } from "../../modals/modal.service";

@Component({
    moduleId: module.id,
    selector: 'group-list',
    templateUrl: 'group-list.component.html'
})
export class GroupListComponent implements OnInit {
    public records: Group[] = [];

    constructor(private service: GroupService, private router: Router,
                private configuration: ConfigurationService, private modalService: ModalService) {
    }

    ngOnInit() {
        if (!this.configuration.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.loadData();
    }

    open(group: Group) {
        this.router.navigate(['/admin/group-detail', group.id]);
    }

    create() {
        this.router.navigate(['/admin/group-detail', 0]);
    }

    remove(group: Group) {
        this.modalService.create('default-placeholder', ModalsModule, YesNoDialogComponent, {
            question: 'Weet u zeker dat u deze groep wissen?'
        }).subscribe((comp: ComponentRef<YesNoDialogComponent>) => {
            comp.instance.dialogClosed.subscribe((dialogResult: DialogResult) => {
                if (dialogResult == DialogResult.Yes) {
                    this.service.remove(group.id)
                        .then((success: boolean) => {
                            if (success) {
                                this.records.splice(this.records.indexOf(group), 1);
                            } else {
                                // Todo: pass message to global exception logger
                                console.debug("het verwijderen is mislukt");
                            }
                        });
                }
            });
        });
    }

    private loadData() {
        this.service.getAll()
            .then((groups: Group[]) => this.records = groups);
    }
}