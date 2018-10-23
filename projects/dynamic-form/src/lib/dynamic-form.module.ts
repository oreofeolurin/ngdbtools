import {NgModule} from '@angular/core';
import {DynamicFormComponent} from './dynamic-form.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlComponent} from './form-control/form-control-component';
import {MultipleFormControlComponent} from './multple-form-control/multiple-form-control-component';
import {FormDialogComponent} from './form-dialog/form-dialog.component';
import {TableFormControlComponent} from './table-form-control/table-form-control.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {
    MatAutocompleteModule, MatDatepickerModule, MatIconModule,
    MatNativeDateModule,
    MatRadioModule, MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, CurrencyMaskModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatIconModule,
    ],
    declarations: [
        DynamicFormComponent, FormControlComponent,
        MultipleFormControlComponent,
        FormDialogComponent,
        TableFormControlComponent
    ],
    exports: [DynamicFormComponent]
})
export class DynamicFormModule {
}
