import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormControlBase } from '../controls/form-control-base';
import { UploadFormControl } from '../controls/upload-form.control';
import { RValidators } from '@ngdbtools/core';
import { GroupFormControl, TableFormControl } from '../controls';

export class FormControlUtils {
    constructor() {
    }

    static toFormGroup(controlArray: FormControlBase[], defaults: object, formValidators: ValidatorFn[]) {
        let allControls: any = {};

        controlArray.forEach(control => {
            let controls = {};
            if (control.controlType === 'group') {
                controls = this.createGroupFromControls(control as GroupFormControl, defaults);
            } else if (control.controlType === 'table') {
                controls = this.createTableFromControls(control as TableFormControl, defaults);
            } else if (control.controlType === 'upload') {
                controls = this.createUploadFormControls(control as UploadFormControl, defaults);
            } else {
                controls = this.createSingleFormControls(control, defaults);
            }

            allControls = Object.assign({}, allControls, controls);
        });

        return new FormGroup(allControls, formValidators);
    }

    private static getValidators(question: FormControlBase): ValidatorFn[] {
        const validators = [];

        question.validators.forEach(str => {
            let validator;
            const args = str.split(':');

            switch (args[0]) {
                case 'email':
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

    private static createGroupFromControls(control: GroupFormControl, defaults: Record<string, any>) {
        let controls: any = {};
        control.controls.forEach(subControl => {
            if (subControl.controlType === 'upload') {
                const uploadControls = this.createUploadFormControls(subControl as UploadFormControl, defaults);
                controls = { ...controls, ...uploadControls };
            } else {
                const subValidators = subControl.validate ? this.getValidators(subControl) : [];
                const subValue = subControl.value || defaults[subControl.key] || '';
                controls[subControl.key] = new FormControl({
                    value: subValue,
                    disabled: this.isControlDisabled(subControl, defaults)
                }, subValidators);
            }
        });

        return controls;
    }

    private static createTableFromControls(control: TableFormControl, defaults: Record<string, any>) {
        const controls: any = {};
        control.rows.forEach(tableRow => {
            tableRow.controls.forEach(subControl => {
                if (subControl.key) {
                    const subValidators = subControl.validate ? this.getValidators(subControl) : [];
                    const subValue = subControl.value ?? defaults[subControl.key] ?? '';
                    controls[subControl.key] = new FormControl(
                        { value: subValue, disabled: this.isControlDisabled(control, defaults) },
                        subValidators
                    );
                }
            });
        });

        return controls;
    }

    private static createSingleFormControls(control: any, defaults: Record<string, any>) {
        const controls: any = {};
        const validators = control.validate ? this.getValidators(control) : [];
        const value = control.value || defaults[control.key] || '';
        controls[control.key] = new FormControl({ value: value || '', disabled: this.isControlDisabled(control, defaults) }, validators);
        return controls;
    }

    private static createUploadFormControls(control: UploadFormControl, defaults: Record<string, any>) {
        const controls: any = {};
        const validators = control.validate ? this.getValidators(control) : [];
        const value = control.value || defaults[control.key] || '';
        const fileNameValue = control.value || defaults[control.fileNameKey] || '';
        controls[control.key] = new FormControl({ value: value || '', disabled: this.isControlDisabled(control, defaults) }, validators);
        controls[control.fileNameKey] = new FormControl({ value: fileNameValue, disabled: true }, validators);
        return controls;
    }

    private static isControlDisabled(control: FormControlBase, defaults: any) {
        return control.disabled || (control.disabledIfExist && defaults[control.key]);
    }

    private static compareControl(key: string, comparingControl: string, controlType: string) {

    }
}
