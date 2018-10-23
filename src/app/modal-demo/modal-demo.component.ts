import {Component, OnInit} from '@angular/core';
import {ModalService, Modal, ModalExistRef, ModalData} from '@ngdbtools/common';
import {DynamicFormDemoComponent} from '../dynamic-form/dynamic-form-demo.component';

@Component({
    selector: 'app-modal-demo',
    templateUrl: './modal-demo.component.html',
    styleUrls: ['./modal-demo.component.css']
})
export class ModalDemoComponent implements OnInit {

    constructor(private modal: ModalService) {
    }

    ngOnInit() {
    }

    public openModal() {
        const dialogModal = new Modal(DynamicFormDemoComponent, new ModalData('hello', 'world'));

        const sub = this.modal.open(dialogModal).subscribe((ref: ModalExistRef) => {
            if (ref.tag === dialogModal.tag && ref.resolve) {
                console.log(ref.resolve);
            }
            sub.unsubscribe();
        });

    }

}
