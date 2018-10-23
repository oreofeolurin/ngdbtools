import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup, ValidatorFn} from '@angular/forms';
import {FormControlUtils} from './form-control/form-control.utils';
import {FormControlBase} from './controls/form-control-base';
import {noop, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {RValidators} from '@ngdbtools/core';

@Component({
    selector: 'db-dynamic-form',
    templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
    @Input() controls: FormControlBase<any>[] = [];
    @Input() defaults: object = {};
    @Input() validators: ValidatorFn[] = [];
    @Input() markAsDirty = false;
    @Input() submitAttempted = false;

    @Output() valueChanges = new EventEmitter<any>();
    @Output() ngSubmit = new EventEmitter<any>();

    public form: FormGroup;
    private subscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        this.setForm();
    }

    /**
     * Watch for any cnage in controls and defaults input and reconstruct the form
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['controls'] && changes['controls'].currentValue) {
            this.form = FormControlUtils.toFormGroup(changes['controls'].currentValue, this.defaults || {}, this.validators);
        }

        if (changes['defaults'] && changes['defaults'].currentValue) {
            this.form = FormControlUtils.toFormGroup(this.controls, changes['defaults'].currentValue || {}, this.validators);
        }

        if (changes['validators'] && changes['validators'].currentValue) {
            this.form = FormControlUtils.toFormGroup(this.controls, this.defaults, changes['validators'].currentValue);
        }
    }

    onSubmit() {
        return this.ngSubmit.emit(this.getPayload());
    }

    getPayload() {
        this.submitAttempted = true;
        if (this.form.valid) {
            return this.form.getRawValue();
        }
        console.log(RValidators.getFormGroupErrors(this.form));
        return false;
    }

    setDefaults(defaults: object) {
        this.defaults = defaults;
        return this;
    }

    setControls(controls: FormControlBase<any>[]) {
        this.controls = controls;
        return this;
    }

    setValidators(validators: ValidatorFn[]) {
        this.validators = validators;
        return this;
    }

    private setForm() {
        this.form = this.controls ?
            FormControlUtils.toFormGroup(this.controls, this.defaults || {}, this.validators)
            : new FormGroup({});

        this.subscription = this.form.valueChanges
            .pipe(tap((data) => this.valueChanges.emit(data)))
            .subscribe();

        this.markAsDirty ? this.form.markAsDirty() : noop();

    }

    update(defaults: object = this.defaults,
           controls: FormControlBase<any>[] = this.controls,
           validators: ValidatorFn[] = this.validators) {
        this.defaults = Object.assign({}, this.defaults, defaults);
        this.controls = controls;
        this.validators = validators;

        this.setForm();
    }

    markAllAsDirty() {
        this.markAsDirty = true;
        this.form.markAsDirty();
    }

    setSubmitAttempted(submitted: boolean = true) {
        this.submitAttempted = submitted;
    }

    setErrorsOnControl(path: string, errors: object) {
        this.form.get(path).setErrors(errors);
        this.form.get(path).markAsDirty();
        // const newForm = this.form;
        // this.form = newForm;
        // console.log("1.");
        // console.log(this.form.get('dateOfIdentityExpiration').errors);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
