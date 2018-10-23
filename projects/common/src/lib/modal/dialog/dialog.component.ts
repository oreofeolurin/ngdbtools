import {Component} from '@angular/core';
import {ModalRef} from '../models';
import {Dialog, DialogAction} from './dialog';

@Component({
    selector: 'db-alert-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    public dialog: Dialog;

    constructor(private modalRef: ModalRef) {
        this.dialog = modalRef.modal.data.get(Dialog.DIALOG_DATA_KEY);
    }


    public setButtonClass(action: DialogAction) {
        return {
            'btn-neutral': action.type === DialogAction.NEUTRAL,
            'btn-secondary': action.type === DialogAction.SUCCESS,
            'btn-danger': action.type === DialogAction.ERROR,
            error: action.type === DialogAction.ERROR,
        };
    }

    public call(action: DialogAction) {
        this.modalRef.close(action.resolve);
    }

}
