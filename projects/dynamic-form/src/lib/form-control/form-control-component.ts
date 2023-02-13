import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import {  DropdownFormControl } from '../controls';

@Component({
    selector: 'db-form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent implements OnInit {
    @Input() control!: any ;
    @Input() form!: FormGroup;
    @Input() group!: string;
    FILE_LIMIT = 5 * 1024 * 1024;
    filteredOptions?: Observable<any[]>;

    ngOnInit() {

        this.filteredOptions = this.form.get(this.control.key)?.valueChanges
            .pipe(
                startWith<string | object>(''),
                map((option: any) => typeof option === 'string' ? option : option['value']),
                map((name: any) => name ? this._filter(name) : this.control.options.slice() )
        
            );
    }

    public displayFn(option?: Record<string, any>): any {
        return option ? option['value'] : undefined;
    }

    private _filter(value: string): Record<string, any>[] {
        const filterValue = value.toLowerCase();

        return (this.control as DropdownFormControl).options.filter(option => option['value'].toLowerCase().indexOf(filterValue) > -1);
    }


    public fileChangeEvent(evt: any) {
        const file = evt.target.files[0];

        if (file) {
            if (file.size <= this.FILE_LIMIT) {
                this.form.get(this.control.key)?.setValue(file);
                this.form.get(this.control.fileNameKey)?.setValue(file.name);
            } else {
                alert('File is too big!');
            }
        }

    }

}
