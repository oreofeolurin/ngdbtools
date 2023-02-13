import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface CalenderFormControlOptions extends FormControlBaseOptions {
    max?: string;
    min?: string;
    toDateKey?: boolean;
}


export class CalenderFormControl extends FormControlBase {
    override controlType = 'calender';
    max: string;
    min: string;
    toDateKey: boolean;

    constructor(options: CalenderFormControlOptions = {}) {
        super(options);
        this.max = options.max ?? '';
        this.min = options.min ?? '';
        this.toDateKey = options.toDateKey ?? false;
    }
}
