import {AbstractControl, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {Validator} from 'class-validator';

const validator = new Validator();

export class RValidators {

    public static truthy(c: FormControl) {
        return validator.isBoolean(c.value) && c.value === true ? null : {truthy: {valid: false}};
    }

    /**
     * Check for Number String, Empty String and Positive Number
     *
     */
    public static number(c: FormControl) {
        return c.value.length === 0 || Number(c.value) >= 0 ? null : {number: {valid: false}};
    }

    public static email(c: FormControl) {
        return validator.isEmail(c.value) ? null : {email: {valid: false}};
    }

    public static alpha(c: FormControl) {
        return validator.isAlpha(c.value) ? null : {name: {valid: false}};
    }

    public static username(c: FormControl) {
        return validator.matches(c.value, /^(?![0-9])\w{3,}/)
        && validator.isAlphanumeric(c.value) ? null : {username: {valid: false}};
    }

    public static words(length: number) {
        const wordFunc = function (c: FormControl) {
            return c.value && c.value.trim().split(' ').length >= length ? null : {words: {valid: false}};
        };

        return wordFunc;
    }

    public static phone(c: FormControl): ValidationErrors {
        return c.value.length === 0 || (validator.length(c.value, 11, 11) && validator.isNumberString(c.value))
            ? null
            : {phone: {valid: false}};
    }

    public static Length(length: number) {
        const lengthFunc = function (c: FormControl) {
            return c.value && c.value.trim().length === length ? null : {length: {valid: false}};
        };

        return lengthFunc;
    }

    public static keyValue(c: FormControl): ValidationErrors {
        return c.value.key && c.value.value ? null : {keyValue: {valid: false}};
    }

    public static getFormGroupErrors(form: FormGroup) {
        const formErrors = form.errors;

        Object.keys(form.controls).forEach(key => {
            const errors = form.get(key).errors;
            if (errors !== null) {
                formErrors[key] = Object.keys(form.get(key).errors);
            }
        });

        return formErrors;
    }


    public static matchControl(firstFormControlName: string, secondFormControlName: string) {

        const matchControlFn = function (ac: AbstractControl) {
            const firstValue = ac.get(firstFormControlName).value;
            const secondValue = ac.get(secondFormControlName).value;

            if (firstValue === secondValue) {
                return null;
            }


            // ac.setErrors({[secondFormControlName]: { matchControl:  false} });
            ac.get(secondFormControlName).setErrors({matchControl: false});
        };

        return matchControlFn;
    }

}
