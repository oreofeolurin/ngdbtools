import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDemoComponent } from './modal-demo.component';
import { RouterModule } from '@angular/router';
import { modalAnimate, ModalModule, stateAnimate } from '@ngdbtools/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicModalComponent } from './dynamic-modal.component';

const routes = [
  { path: '', component: ModalDemoComponent }
];

const MODAL_ANIMATION_METADATA = modalAnimate(
  stateAnimate({ xPercent: 100 }),
  stateAnimate(.5, { xPercent: 0, backgroundColor: 'rgba(0, 0, 0, 0.70)', display: 'flex', opacity: 1 }),
  stateAnimate(.5, { xPercent: 100, opacity: 0, display: 'none' }),
);


@NgModule({
  declarations: [
    ModalDemoComponent,
    DynamicModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ModalModule.forRoot(MODAL_ANIMATION_METADATA),
    RouterModule.forChild(routes)
  ],
  exports: [ModalModule],
})
export class ModalDemoModule { }
