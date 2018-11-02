import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FormControlBase} from '../controls/form-control-base';
import {UploadFormControl} from '../controls/upload-form.control';
import {RValidators} from '@ngdbtools/core';

export class FormControlUtils {
    constructor() {
    }

    static toFormGroup(controlArray: FormControlBase<any>[], defaults: object, formValidators: ValidatorFn[]) {
        let allControls: any = {};

        controlArray.forEach(control => {
            let controls = {};
            if (control.controlType === 'group') {
                controls = this.createGroupFromControls(control, defaults);
            } else if (control.controlType === 'table') {
                controls = this.createTableFromControls(control, defaults);
            } else if (control.controlType === 'upload') {
                controls = this.createUploadFormControls(control as any, defaults);
            } else {
                controls = this.createSingleFormControls(control, defaults);
            }

            allControls = Object.assign({}, allControls, controls);
        });

        return new FormGroup(allControls, formValidators);
    }

    private static getValidators(question: FormControlBase<any>): ValidatorFn[] {
        const validators = [];

        question.validators.forEach(str => {
            let validator;
            const args = str.split(':');

            switch (args[0]) {
                case 'email' :
                    validator = RValidators.email;
                    break;
                case 'number':
                    validator = RValidators.number;
                    break;
                case 'phone':
                    validator = RValidators.phone;
                    break;
                case 'keyValue':
                    validator = RValidators.keyValue;
                    break;
                case 'min':
                    validator = Validators.min(Number(args[1]));
                    break;
                case 'max':
                    validator = Validators.max(Number(args[1]));
                    break;
                case 'length':
                    validator = RValidators.Length(Number(args[1]));
                    break;
                case 'control':
                    validator = this.compareControl(question.key, args[1], args[2]);
                    break;
                case 'words':
                    validator = RValidators.words(Number(args[1]));
            }
            if (validator) {
                validators.push(validator);
            }
        });
        if (question.required) {
            validators.push(Validators.required);
        }

        return validators;
    }

    private static createGroupFromControls(control: FormControlBase<any>, defaults: object) {
        const controls = {};
        control['controls'].forEach(subControl => {
            const subValidators = subControl.validate ? this.getValidators(subControl) : [];
            const subValue = subControl.value || defaults[subControl.key] || '';
            controls[subControl.key] = new FormControl({
                value: subValue,
                disabled: this.isControlDisabled(subControl, defaults)
            }, subValidators);
        });

        return controls;
    }

    private static createTableFromControls(control: FormControlBase<any>, defaults: object) {
        const controls = {};
        control['rows'].forEach(tableRow => {

            tableRow.controls.forEach(subControl => {
                if (subControl.key) {
                    const subValidators = subControl.validate ? this.getValidators(subControl) : [];
                    const subValue = subControl.value || defaults[subControl.key] || '';
                    controls[subControl.key] = new FormControl(
                        {value: subValue, disabled: this.isControlDisabled(control, defaults)},
                        subValidators
                    );
                }
            });
        });

        return controls;
    }

    private static createSingleFormControls(control: FormControlBase<any>, defaults: object) {
        const controls = {};
        const validators = control.validate ? this.getValidators(control) : [];
        const value = control.value || defaults[control.key] || '';
        controls[control.key] = new FormControl({value: value || '', disabled: this.isControlDisabled(control, defaults)}, validators);
        return controls;
    }

    private static createUploadFormControls(control: UploadFormControl, defaults: object) {
        const controls = {};
        const validators = control.validate ? this.getValidators(control) : [];
        const value = control.value || defaults[control.key] || '';
        const fileNameValue = control.value || defaults[control.fileNameKey] || '';
        controls[control.key] = new FormControl({value: value || '', disabled: this.isControlDisabled(control, defaults)}, validators);
        controls[control.fileNameKey] = new FormControl(fileNameValue, validators);
        return controls;
    }

    private static isControlDisabled(control: FormControlBase<any>, defaults: any) {
        return control.disabled || (control.disabledIfExist && defaults[control.key]);
    }

    private static compareControl(key: string, comparingControl: string, controlType: string) {

    }
}
