import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {debounceTime, tap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {MatPaginator, MatSort} from '@angular/material';
import {TableDataSource} from './table-data-source';
import {FormGroup} from '@angular/forms';
import {FormControlBase, FormControlUtils} from '@ngdbtools/dynamic-form';
import {DynamicTableBuilder} from './dynamic-table-builder';
import {TableDataMeta, TableOptions} from './dynamic-table.interface';

@Component({
    selector: 'db-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styleUrls: ['./dynamic-table.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
    @Input() builder: DynamicTableBuilder;
    @Input() options: TableOptions;
    @Input() dataSource: TableDataSource;
    @Input() filterControls: FormControlBase<any>[] = [];

    @Output() rowClick = new EventEmitter<object>();
    @Output() rowOptionClick = new EventEmitter<object>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('input') input: ElementRef;

    dataMeta: TableDataMeta;
    isLoading: boolean;
    initialized: boolean;
    displayedColumns: Array<string>;
    filterForm: FormGroup;


    constructor() {
    }

    ngOnInit() {
        // set variables from builder
        this.options = this.builder ? this.builder.options : this.options;
        this.dataSource = this.builder ? this.builder.dataSource : this.dataSource;
        this.filterForm = this.builder ? this.builder.filterForm : this.filterForm;
        this.filterControls = this.builder ? this.builder.filterControls : this.filterControls;
    }


    ngAfterViewInit() {
        this.update();
    }

    setTableSource(dataSource: TableDataSource) {
        this.dataSource = dataSource;
        return this;
    }

    setFilterControls(controls: FormControlBase<any>[], defaults = {}) {
        this.filterControls = controls;
        this.filterForm = FormControlUtils.toFormGroup(controls, defaults, []);
        return this;
    }

    setTableOptions(options: TableOptions) {
        this.options = options;
        return this;
    }


    public update() {
        if (this.dataSource && this.options) {
            this.updateDataSource();
            this.updateTableOptions();
            this.loadTablePage();
        }
        this.setEvents();
    }

    private updateDataSource() {
        this.isLoading = true;
        if (this.dataSource) {
            this.dataSource.meta$.subscribe(meta => this.dataMeta = meta);
            this.dataSource.loading$.subscribe(loading => {
                this.isLoading = loading;
                this.initialized = true;
            });
        }
    }

    private updateTableOptions() {
        if (this.options) {
            this.displayedColumns = this.options.columns.cols.map(col => col.key);
            if (this.options.rowOptions) {
                this.displayedColumns.unshift('rowOptions');
            }
        }
    }

    private setEvents() {
        // Set up events for filterForm
        if (this.filterForm) {
            // Load Table page on filter value changes
            this.filterForm.valueChanges
                .pipe(debounceTime(150), tap(() => this.loadTablePage()))
                .subscribe();
        }

        // Set up events for event sort
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        // Load Table page on sort or paginator
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(() => this.loadTablePage()))
            .subscribe();
    }

    private loadTablePage() {
        const filterForm: { key: string } = this.filterForm && this.filterForm.getRawValue();

        const tableLoadDataOptions = {
            data: this.options.loadOptionsData,
            filter: filterForm ? (<any>Object).values(filterForm) : null,
            filterBy: filterForm ? Object.keys(filterForm) : null,
            sortActive: this.sort.active,
            sortDirection: this.sort.direction,
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize
        };

        this.dataSource.loadTableData(tableLoadDataOptions);
    }

    onRowClick(data: object) {
        this.rowClick.emit(data);
    }

    onRowOptionClick(key, data) {
        this.rowOptionClick.emit({key, data});
    }
}
