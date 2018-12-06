import {TableLoadDataOptions} from './table-data-source';
import {Observable} from 'rxjs';

export interface ColDefinition {
    name: string;
    key: string;
    width: number;
    type?: string;
}

export interface TableOptions {
    loadOptionsData?: any;
    search?: boolean;
    rowOptions?: {key: string, name: string}[];
    columns: {
        sortActive: string;
        sortDirection: string;
        cols: ColDefinition[];
    };
}


export interface TableDataMeta {
    totalCount: number;
}

export interface TableData {
    id: number;
    description: string;
    iconUrl: string;
    courseListIcon: string;
    longDescription: string;
    category: string;
    lessonsCount: number;
}

export interface TableLoadedData {
    transformed?: boolean;
    data: any[];
    totalCount?: number;
}

export interface TableDataService {
    findTableData(options: TableLoadDataOptions): Observable<TableLoadedData>;
}
