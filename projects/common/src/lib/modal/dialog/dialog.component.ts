import { Component } from '@angular/core';
import { ModalData, ModalRef } from '../models';
import { Dialog, DialogAction } from './dialog';

@Component({
    selector: 'db-alert-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    public dialog: Dialog;

    constructor(private modalRef: ModalRef) {
        const modalData = this.modalRef.modal.data ?? {};
        
        if (modalData instanceof ModalData || modalData instanceof Map) {
            this.dialog = modalData.get(Dialog.DIALOG_DATA_KEY);
        } else {
            this.dialog = modalData[Dialog.DIALOG_DATA_KEY];
        }
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
