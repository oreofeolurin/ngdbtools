import {FormControlBase} from './form-control-base';

export class UploadFormControl extends FormControlBase<string> {
    controlType = 'upload';
    type: string;
    fileNameKey: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.fileNameKey = options['fileName'] || `${this.key}_fileName` ;
    }
}
