import {TableDataSource} from './table-data-source';
import {TableOptions} from './dynamic-table.interface';
import {FormGroup} from '@angular/forms';
import {FormControlBase, FormControlUtils} from '@ngdbtools/dynamic-form';

export class DynamicTableBuilder {
    public filterForm: FormGroup;

    constructor(public dataSource?: TableDataSource,
                public options?: TableOptions,
                public filterControls?: FormControlBase<any>[]) {
    }

    setTableSource(dataSource: TableDataSource) {
        this.dataSource = dataSource;
        return this;
    }

    setFilterControls(controls: FormControlBase<any>[], defaults = {}) {
        this.filterControls = controls;
        this.filterForm = FormControlUtils.toFormGroup(controls, defaults, []);
        return this;
    }

    setTableOptions(options: TableOptions) {
        this.options = options;
        return this;
    }
}
