import {FormControlBase} from './form-control-base';

export class LabelTextControl extends FormControlBase<string> {
    controlType = 'label-text';
    text: string;

    constructor(options: {} = {}) {
        super(options);
        this.text = options['text']  || this.column;
    }
}
