import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface CurrencyFormControlOptions extends FormControlBaseOptions {
    options?: {prefix: string, align: string};
}
export class CurrencyFormControl extends FormControlBase {
    override controlType = 'currency';
    options = { prefix: '₦ ', align: 'left' };

    constructor(options: CurrencyFormControlOptions = {}) {
        super(options);
        this.options = options.options ?? this.options;
    }
}
