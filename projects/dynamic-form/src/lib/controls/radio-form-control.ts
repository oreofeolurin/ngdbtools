import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface RadioFormControlOptions extends FormControlBaseOptions {
    options?: {key: string, value: string}[];
}


export class RadioFormControl extends FormControlBase{
    override controlType = 'radio';
    options: {key: string, value: string}[] = [];

    constructor(options: RadioFormControlOptions = {}) {
        super(options);
        this.options = options.options ?? [];
    }
}
