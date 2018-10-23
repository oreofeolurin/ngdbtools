import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormDemoComponent} from './dynamic-form-demo.component';
import {RouterModule} from '@angular/router';
import {DynamicFormModule} from '@ngdbtools/dynamic-form';
import {ModalModule} from '@ngdbtools/common';

@NgModule({
    imports: [
        CommonModule,
        ModalModule,
        DynamicFormModule,
        RouterModule.forChild([
            {path: 'dynamic-form', component: DynamicFormDemoComponent}
        ])
    ],
    declarations: [DynamicFormDemoComponent],
})
export class DynamicFormDemoModule {
}
