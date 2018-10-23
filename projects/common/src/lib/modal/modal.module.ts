import {ANALYZE_FOR_ENTRY_COMPONENTS, InjectionToken, NgModule} from '@angular/core';
import {ModalComponent} from './modal.component';
import {ModalService} from './modal.service';
import {DialogComponent} from './dialog/dialog.component';
import {CommonModule} from '@angular/common';
import {MODAL_ANIMATION_METADATA, ModalAnimationMetadata} from './modal-animation-metadata';

@NgModule({
    imports: [CommonModule],
    declarations: [ModalComponent, DialogComponent],
    providers: [ModalService],
    exports: [ModalComponent, DialogComponent],
    entryComponents: [DialogComponent]
})
export class ModalModule {

    static withComponents(components: any[], animation?: ModalAnimationMetadata) {
        return {
            ngModule: ModalModule,
            providers: [
                {
                    provide: ANALYZE_FOR_ENTRY_COMPONENTS,
                    useValue: components,
                    multi: true
                },
                {provide: MODAL_ANIMATION_METADATA, useValue: animation}]
        };
    }
}
