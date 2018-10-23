import {FormControlBase} from './form-control-base';


export class RadioFormControl extends FormControlBase<string> {
    controlType = 'radio';
    options: {key: string, value: string}[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
