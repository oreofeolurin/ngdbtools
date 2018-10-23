import {FormControlBase} from './form-control-base';


export class CalenderFormControl extends FormControlBase<string> {
    controlType = 'calender';
    max;
    min;
    toDateKey;

    constructor(options: {} = {}) {
        super(options);
        this.max = options['max'] || '';
        this.min = options['min'] || '';
        this.toDateKey = options['toDateKey'];
    }
}
