import {NgModule} from '@angular/core';
import {DynamicTableComponent} from './dynamic-table.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule, MatMenuModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
        MatSelectModule,
        MatSortModule,
        MatIconModule
    ],
    declarations: [DynamicTableComponent],
    exports: [DynamicTableComponent]
})
export class DynamicTableModule {
}
