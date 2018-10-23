import {FormControlBase} from './form-control-base';

export class TableFormControl extends FormControlBase<string> {
    controlType = 'table';
    columns: {name: string, width: string}[];
    rows: TableRowFormControl[];

    constructor(options: {} = {}) {
        super(options);
        this.rows = options['rows'] || [];
        this.columns = options['columns'] || [];
    }
}

export class TableRowFormControl extends FormControlBase<string> {
    controlType = 'table-row';
    controls: FormControlBase<any>[];

    constructor(options: {} = {}) {
        super(options);
        this.controls = options['controls'] || [];
    }
}
