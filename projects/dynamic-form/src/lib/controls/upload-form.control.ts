import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface UploadFormControlOptions extends FormControlBaseOptions {
    type?: string;
    fileName?: string;
}

export class UploadFormControl extends FormControlBase {
    override controlType = 'upload';
    type: string;
    public fileNameKey: string;

    constructor(options: UploadFormControlOptions = {}) {
        super(options);
        this.type = options.type ?? '';
        this.fileNameKey = options.fileName ?? `${this.key}_fileName` ;
    }
}
