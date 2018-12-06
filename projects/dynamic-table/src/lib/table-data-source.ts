import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {TableDataMeta, TableData, TableDataService, TableLoadedData} from './dynamic-table.interface';
import {catchError, finalize} from 'rxjs/operators';

const DEFAULT_TABLE_META: TableDataMeta = {totalCount: 0};
const DEFAULT_TABLE_LOAD_DATA_OPTIONS: TableLoadDataOptions = {
    filter: null, filterBy: null, sortActive: null, sortDirection: 'asc', pageIndex: 0, pageSize: 3
};

export interface TableLoadDataOptions {
    data?: any;
    filter: string | string[];
    filterBy: string | string[];
    sortActive: string;
    sortDirection: string;
    pageIndex: number;
    pageSize: number;
}

export class TableDataSource implements DataSource<TableData> {

    private metaSubject = new BehaviorSubject<TableDataMeta>(DEFAULT_TABLE_META);
    private dataSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    public meta$ = this.metaSubject.asObservable();

    constructor(private tableDataService: TableDataService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.metaSubject.complete();
        this.loadingSubject.complete();
    }

    loadTableData(options: TableLoadDataOptions = DEFAULT_TABLE_LOAD_DATA_OPTIONS) {

        this.loadingSubject.next(true);

        this.tableDataService.findTableData(options).pipe(
            catchError(() => of({})),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(res => {
            if (res['data'] && !res['transformed']) {
                res = this.filterTableData(res['options'], res['data']);
            }
            this.dataSubject.next(res['data']);
            this.metaSubject.next({totalCount: res['totalCount']});
        });
    }


    private filterTableData(options: TableLoadDataOptions, data: any[]): TableLoadedData {

        const totalCount = data.length;
        let transformedArray = data;

        if (options.filter) {
            transformedArray = transformedArray.filter((review) => review[options.sortActive].contains(options.filter));
        }

        if (options.sortActive) {
            if (typeof transformedArray[0][options.sortActive] === 'number') {
                transformedArray.sort((a, b) => {
                    if (options.sortDirection === 'asc') {
                        return a[options.sortActive] - b[options.sortActive];
                    } else {
                        return b[options.sortActive] - a[options.sortActive];
                    }
                });

            } else {
                transformedArray.sort((a, b) => {
                    if (options.sortDirection === 'asc') {
                        return a[options.sortActive].localeCompare(b[options.sortActive]);
                    } else {
                        return b[options.sortActive].localeCompare(a[options.sortActive]);
                    }
                });
            }
        }

        const start = options.pageIndex * options.pageSize;
        const end = start + options.pageSize;

        transformedArray = transformedArray.slice(start, end);

        return {data: transformedArray, totalCount, transformed: true};
    }
}

