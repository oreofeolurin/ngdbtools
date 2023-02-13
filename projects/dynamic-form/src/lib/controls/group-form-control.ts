import {FormControlBase, FormControlBaseOptions} from './form-control-base';

export interface GroupFormControlOptions extends FormControlBaseOptions {
    controls?: FormControlBase[];
}

export class GroupFormControl extends FormControlBase {
    override controlType = 'group';
    controls: FormControlBase[];

    constructor(options: GroupFormControlOptions = {}) {
        super(options);
        this.controls = options.controls ?? [];
        this.column = options.column ? this.column : {normal: 12};
    }
}

