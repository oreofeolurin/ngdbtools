import {FormControlBase} from '..';
import {Dialog} from '@ngdbtools/common';

export class FormDialog extends Dialog {

    public static readonly FORM_DIALOG_DATA_KEY = 'db-form-dialog';

    private formControls: FormControlBase<any>[];
    private formDefaults: any;

    constructor(title: string, message?: string) {
        super(title, message);
    }

    setFormControls(controls: FormControlBase<any>[]) {
        this.formControls = controls;
    }

    setFormDefaults(defaults: any) {
        this.formDefaults = defaults;
    }

    getFormControls() {
        return this.formControls;
    }

    getFormDefaults() {
        return this.formDefaults || {};
    }

}
