import {NgModule} from '@angular/core';
import {PluralPipe} from './pipes/plural.pipe';
import {SmartDatePipe} from './pipes/smart-date.pipe';
import {ReplacePipe} from './pipes/replace.pipe';

@NgModule({
    declarations: [
        PluralPipe,
        SmartDatePipe,
        ReplacePipe
    ],
    exports : [
        PluralPipe,
        SmartDatePipe,
        ReplacePipe
    ]
})
export class CollectiveModule {}
