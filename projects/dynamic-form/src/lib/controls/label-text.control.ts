import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface LabelTextControlOptions extends FormControlBaseOptions {
    text?: string;
}


export class LabelTextControl extends FormControlBase {
    override controlType = 'label-text';
    text: string;

    constructor(options: LabelTextControlOptions = {}) {
        super(options);
        this.text = options.text ?? '';
    }
}
