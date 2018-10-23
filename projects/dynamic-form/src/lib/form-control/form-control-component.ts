import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControlBase} from '../controls/form-control-base';
import {map, startWith} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'db-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements OnInit {
    @Input() control: FormControlBase<any>;
    @Input() form: FormGroup;
    @Input() group: string;
    FILE_LIMIT = 5 * 1024 * 1024;
    filteredOptions: Observable<string[]>;

    ngOnInit() {

        this.filteredOptions = this.form.get(this.control.key).valueChanges
            .pipe(
                startWith<string | object>(''),
                map(option => typeof option === 'string' ? option : option['value']),
                map(name => name ? this._filter(name) : this.control['options'].slice())
            );
    }

    public displayFn(option?: object): string | undefined {
        return option ? option['value'] : undefined;
    }

    private _filter(value: string): object[] {
        const filterValue = value.toLowerCase();

        return this.control['options'].filter(option => option['value'].toLowerCase().indexOf(filterValue) > -1);
    }


    public fileChangeEvent(evt: any) {
        const file = evt.target.files[0];

        if (file) {
            if (file.size <= this.FILE_LIMIT) {
                this.form.get(this.control.key).setValue(file);
                this.form.get(this.control['fileNameKey']).setValue(file.name);
            } else {
                alert('File is too big!');
            }
        }

    }

}
