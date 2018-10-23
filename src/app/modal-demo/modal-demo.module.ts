import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalModule} from '@ngdbtools/common';
import {RouterModule} from '@angular/router';
import {DynamicFormDemoComponent} from '../dynamic-form/dynamic-form-demo.component';
import {ModalDemoComponent} from './modal-demo.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', component: ModalDemoComponent}
        ]),
        ModalModule.withComponents([DynamicFormDemoComponent]),
    ],
    declarations: [ModalDemoComponent],
    exports: [ModalModule]
})
export class ModalDemoModule {
}
