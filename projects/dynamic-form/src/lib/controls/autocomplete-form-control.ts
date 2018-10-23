import {FormControlBase} from './form-control-base';
import {DropdownFormControl} from './dropdown-form-control';


export class AutoCompleteFormControl extends FormControlBase<string> {
    controlType = 'autocomplete';
    options: { key: string, value: string, description: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
    }

    static toDropdownOptions(dataArray: any, keyName: string, valueName: string | Function = keyName, descriptionStr?: string) {
        const arr = dataArray || [];
        return arr.map(data => {
            const value = DropdownFormControl.formatValue(data, valueName);
            const description = DropdownFormControl.formatValue(data, descriptionStr);
            return {key: data[keyName], value, description};
        });

    }

    static formatValue(data, value) {
        if (typeof value === 'function') {
            return value(data);
        } else if (typeof value === 'string') {
            return DropdownFormControl.fromTemplate(data, value);
        } else {
            return null;
        }
    }

    static fromTemplate(data: object, template: string) {
        const dataKeys = Object.keys(data);
        let templateStr = template;
        dataKeys.forEach(key => {
            templateStr = templateStr.replace(`[${key}]`, data[key]);
        });
        return templateStr;
    }
}
