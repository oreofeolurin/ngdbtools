import {FormControlBase} from './form-control-base';


export class MultipleFormControl extends FormControlBase<string> {
    controlType = 'multiple';
    controls: FormControlBase<any>[];
    column = {normal: 12};

    constructor(options: {} = {}) {
        super(options);
        this.controls = options['controls'] || [];
        this.column = options['column']  || this.column;
    }
}

