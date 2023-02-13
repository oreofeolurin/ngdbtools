import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {merge} from 'rxjs';
import {Subscription} from 'rxjs';
import {FormControlUtils} from '../form-control/form-control.utils';

@Component({
    selector: 'db-multiple-form-control',
    templateUrl: './multiple-form-control.component.html',
    styleUrls: ['./multiple-form-control.component.scss']
})
export class MultipleFormControlComponent implements OnInit, OnChanges, OnDestroy {
    @Input() control!: any;
    @Input('form') parentForm!: FormGroup;
    public formGroups: Array<FormGroup> = [];
    public additionAttempted = false;
    private subscription?: Subscription;


    constructor() {}

    ngOnInit() {
        this.initiateFormGroups();
    }

    initiateFormGroups() {
        this.formGroups = [];
        const defaultsArray = this.parentForm.get(this.control.key)?.value;
        if (Array.isArray(defaultsArray) && defaultsArray.length > 0) {

            defaultsArray.forEach(obj => {
                this.addFormGroup(false, obj);
            });
        } else {
            this.addFormGroup(false);
        }
    }

    /**
     * Watch for any change in control and parentForm input and apply those changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['control'] && changes['control'].currentValue) {
            this.control = changes['control'].currentValue;
            this.initiateFormGroups();
        }

        if (changes['parentForm'] && changes['parentForm'].currentValue) {
            this.parentForm = changes['parentForm'].currentValue;
            this.initiateFormGroups();
        }
    }

    monitorChanges(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        const changes = this.formGroups.map(group => group.valueChanges);
        this.subscription = merge(...changes).subscribe(data => this.setFormValue());
    }

    private setFormValue() {
        if (this.validateForm()) {
            this.parentForm.get(this.control.key)?.setValue(this.getFormObj());
        } else {
            this.parentForm.get(this.control.key)?.setValue('');
        }
    }


    addFormGroup(validate = true, defaults = {}, validators = []) {
        if (validate && !this.validateForm()) {
            this.additionAttempted = true;
            return;
        }
        const form = FormControlUtils.toFormGroup(this.control['controls'], defaults, validators);

        this.formGroups.push(form);
        this.additionAttempted = false;
        this.monitorChanges();
    }

    removeFormGroup(index: number) {
        this.formGroups.splice(index, 1);
        this.setFormValue();
        this.monitorChanges();
    }

    private validateForm() {
        return this.formGroups.every(form => form.valid);
    }

    private getFormObj(): Array<object> {
        return this.formGroups.map(form => form.getRawValue());
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
