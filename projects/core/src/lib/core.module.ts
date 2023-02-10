import {ModuleWithProviders, NgModule} from '@angular/core';
import {DBToolsConfig} from './interfaces/db-tools.config';
import {Logger, LoggerFactory} from './services/logger.service';
import {LocalStore, LocalStoreFactory} from './helpers';

@NgModule()
export class DBToolsModule {

    static forRoot(dbToolsConfig?: DBToolsConfig): ModuleWithProviders<DBToolsModule> {
        return {
            ngModule: DBToolsModule,
            providers: [
                {provide: Logger, useFactory: LoggerFactory(dbToolsConfig?.isProd)},
                {provide: LocalStore, useFactory: LocalStoreFactory(dbToolsConfig?.localStorageName)},
            ]
        };
    }
}
