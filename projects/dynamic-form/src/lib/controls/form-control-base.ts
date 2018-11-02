export interface FormControlColumn {
    normal: number;
    break?: boolean;
}

export interface FormControlBaseOptions<T> {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    disabledIfExist?: boolean;
    hidden?: boolean;
    order?: number;
    controlType?: string;
    placeholder?: string;
    invalidFeedback?: string;
    helpText?: string;
    description?: string;
    validators?: string[];
    validate?: boolean;
    column?: FormControlColumn | number;
    classes?: string[];
}

export class FormControlBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    disabled: boolean;
    disabledIfExist: boolean;
    hidden: boolean;
    order: number;
    controlType: string;
    placeholder: string;
    invalidFeedback: string;
    helpText: string;
    description: string;
    validators: string[];
    validate = true;
    column: FormControlColumn = {normal: 6, break: false};
    classes: string[];

    constructor(options: FormControlBaseOptions<T> = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.disabled = !!options.disabled;
        this.disabledIfExist = !!options.disabledIfExist;
        this.hidden = !!options.hidden;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || '';
        this.placeholder = options.placeholder || '';
        this.invalidFeedback = options.invalidFeedback || '';
        this.helpText = options.helpText || '';
        this.description = options.description || '';
        this.validators = options.validators || [];
        this.validate = typeof options.validate === 'boolean' ? options.validate : this.validate;
        this.column = typeof options.column === 'number' ? {normal: options.column} : options.column || this.column;
        this.classes = options.classes || [];
    }
}
