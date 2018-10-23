import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {DynamicFormComponent} from '../dynamic-form.component';
import {FormDialog} from './form-dialog';
import {ModalRef, Modal, DialogAction} from '@ngdbtools/common';

@Component({
    selector: 'db-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
    @ViewChild(DynamicFormComponent) dynamicForm: DynamicFormComponent;
    public dialog: FormDialog;

    constructor(injector: Injector, private modalRef: ModalRef) {
        this.dialog = modalRef.getData(FormDialog.FORM_DIALOG_DATA_KEY);
    }

    ngOnInit() {
        this.dynamicForm.update(this.dialog.getFormDefaults(), this.dialog.getFormControls());
    }

    public setButtonClass(action: DialogAction) {
        return {
            'btn-neutral': action.type === DialogAction.NEUTRAL,
            'btn-secondary': action.type === DialogAction.SUCCESS,
            'btn-danger': action.type === DialogAction.ERROR,
            error: action.type === DialogAction.ERROR,
        };
    }

    onSubmit() {
        const payload = this.dynamicForm.getPayload();
        if (payload) {
            this.call(payload);
        }
    }

    public call(payload: DialogAction | any) {
        this.modalRef.close(payload);
    }
}
