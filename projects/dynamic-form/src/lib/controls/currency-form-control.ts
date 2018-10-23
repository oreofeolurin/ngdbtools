import {FormControlBase} from './form-control-base';

export class CurrencyFormControl extends FormControlBase<string> {
    controlType = 'currency';
    options = {prefix: '₦ ', align: 'left' };

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || this.options;
    }
}
