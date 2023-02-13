import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlComponent } from './form-control/form-control-component';
import { MultipleFormControlComponent } from './multiple-form-control/multiple-form-control-component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { TableFormControlComponent } from './table-form-control/table-form-control.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, CurrencyMaskModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
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
