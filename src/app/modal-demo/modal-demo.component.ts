import { Component, OnInit } from '@angular/core';
import { ModalService, Modal, ModalExistRef, Dialog, modalAnimate, stateAnimate } from '@ngdbtools/common';
import { DynamicModalComponent } from './dynamic-modal.component';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
})
export class ModalDemoComponent implements OnInit {
  dialogResolved: any;
  modalResolved: any;

  constructor(private modal: ModalService) {
  }

  ngOnInit() { }


  public openModal() {
    const dialogModal = new Modal(DynamicModalComponent, { 'hello': 'world' });

    const sub = this.modal.open(dialogModal).subscribe((ref: ModalExistRef) => {
      this.modalResolved = ref.resolve;
      if(ref.forceClose) {
        this.modalResolved = "Modal was force closed";
      }
      sub.unsubscribe();
    });
  }

  public openDialog() {

    const dialog = new Dialog(
      'Leave Details',
      `Thank you for showing interest in our loans, a representative will contact
        you within two working days.`
    );

    // dialog.recedeAction.disable();


    const animation = modalAnimate(
      stateAnimate(.5, { backgroundColor: 'rgba(0, 0, 0, 0.70)', display: 'flex', opacity: 1 }),
      stateAnimate(.5, { opacity: 0, display: 'none' }),
    );
  
    const dialogModal = Modal.createDialog(dialog, { animation });
    const sub = this.modal.open(dialogModal).subscribe((ref: ModalExistRef) => {
      this.dialogResolved = ref.resolve;
      if(ref.forceClose) {
        this.dialogResolved = "Dialog was force closed";
      }
      sub.unsubscribe();
    });
  }
}

