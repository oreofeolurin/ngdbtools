import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface TextBoxFormControlOptions extends FormControlBaseOptions {
    autoComplete?: string;
    type?: string;
    min?: string;
    noNumberSpinner?: boolean;
}

export class TextBoxFormControl extends FormControlBase {
    override controlType = 'textbox';
    autoComplete = 'on';
    type: string;
    min: string;
    override classes = ['form-control'];
    noNumberSpinner = true;

    constructor(options: TextBoxFormControlOptions = {}) {
        super(options);
        this.type = options.type ?? '';
        this.autoComplete = options.autoComplete ?? '';
        this.min = options.min || this.type === 'number' ? '0' : '';
        this.classes = options.classes ? this.classes.concat(options.classes) : this.classes;
        this.noNumberSpinner = options.noNumberSpinner || this.noNumberSpinner;


        if (this.type === 'number' && this.noNumberSpinner) {
            this.classes.push('no-number-spinner');
        }
    }
}
