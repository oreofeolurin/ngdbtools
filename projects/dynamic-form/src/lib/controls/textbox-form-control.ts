import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface TextBoxFormControlOptions<T> extends FormControlBaseOptions<T> {
    autoComplete?: string;
    type?: string;
    min?: string;
}

export class TextBoxFormControl extends FormControlBase<string> {
    controlType = 'textbox';
    autoComplete = 'on';
    type: string;
    min: string;
    classes = ['form-control'];

    constructor(options: TextBoxFormControlOptions<string> = {}) {
        super(options);
        this.type = options['type'] || '';
        this.autoComplete = options['autoComplete'] || '';
        this.min = options['min'] || this.type === 'number' ? '0' : '';
        this.classes = options.classes ? this.classes.concat(options.classes) : this.classes;
    }
}
