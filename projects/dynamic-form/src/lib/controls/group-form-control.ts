import {FormControlBase} from './form-control-base';


export class GroupFormControl extends FormControlBase<string> {
    controlType = 'group';
    controls: FormControlBase<any>[];

    constructor(options: {} = {}) {
        super(options);
        this.controls = options['controls'] || [];
        this.column = options['column'] ? this.column : {normal: 12};
    }
}

