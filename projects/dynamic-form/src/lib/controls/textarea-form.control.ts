import {FormControlBase} from './form-control-base';

export class TextareaFormControl extends FormControlBase<string> {
    controlType = 'textarea';
    rows = 3;

    constructor(options: {} = {}) {
        super(options);
        this.rows = options['rows'] || this.rows;
    }
}
