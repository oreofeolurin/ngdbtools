import { FormControlBase } from './form-control-base';

export class TableFormControl extends FormControlBase {
    override controlType = 'table';
    columns: { name: string, width: string }[];
    rows: TableRowFormControl[];

    constructor(options: Record<string, any> = {}) {
        super(options);
        this.rows = options['rows'] ?? [];
        this.columns = options['columns'] ?? [];
    }
}

export class TableRowFormControl extends FormControlBase {
    override controlType = 'table-row';
    controls: FormControlBase[];

    constructor(options: Record<string, any> = {}) {
        super(options);
        this.controls = options['controls'] ?? [];
    }
}
