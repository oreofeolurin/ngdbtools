import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface TextareaFormControlOptions extends FormControlBaseOptions {
    rows?: number;
}

export class TextareaFormControl extends FormControlBase {
    override controlType = 'textarea';
    rows: number;
    
    constructor(options: TextareaFormControlOptions = {}) {
        super(options);
        this.rows = options?.rows ?? 3;
    }
}
