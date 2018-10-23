import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TableFormControl} from '../controls/table-form.control';

@Component({
    selector: 'db-table-form-control',
    templateUrl: './table-form-control.component.html',
    styleUrls: ['./table-form-control.component.scss']
})
export class TableFormControlComponent {
    @Input() control: TableFormControl;
    @Input('form') parentForm: FormGroup;

    public formGroups: Array<FormGroup> = [];

    constructor() {}

}
