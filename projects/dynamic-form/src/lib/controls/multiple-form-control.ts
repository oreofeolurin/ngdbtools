import { FormControlBase, FormControlBaseOptions, FormControlColumn } from './form-control-base';

export interface MultipleFormControlOptions extends FormControlBaseOptions {
    controls?: FormControlBase[];
    column?: FormControlColumn;
}

export class MultipleFormControl extends FormControlBase {
    override controlType = 'multiple';
    controls: FormControlBase[];
    override column: FormControlColumn;

    constructor(options: MultipleFormControlOptions = {}) {
        super(options);
        this.controls = options.controls ?? [];
        this.column = options.column ?? { normal: 12 };
    }
}

