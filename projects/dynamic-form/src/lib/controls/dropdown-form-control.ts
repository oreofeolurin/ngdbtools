import {FormControlBase} from './form-control-base';


export class DropdownFormControl extends FormControlBase<string> {
    controlType = 'dropdown';
    autoComplete = false;
    options: { key: string, value: string, description: string }[] = [];

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        this.autoComplete = options['autoComplete'] || [];
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
