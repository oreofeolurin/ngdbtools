import {ModuleWithProviders, NgModule} from '@angular/core';
import {ModalComponent} from './modal.component';
import {ModalService} from './modal.service';
import {DialogComponent} from './dialog/dialog.component';
import {CommonModule} from '@angular/common';
import {ANIMATION_METADATA_TOKEN, DEFAULT_MODAL_ANIMATION_METADATA} from './modal-animation-metadata';
import { ModalDirective } from './modal.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ModalComponent, DialogComponent, ModalDirective],
    providers: [ModalService],
    exports: [ModalComponent, DialogComponent],
})
export class ModalModule {
    static forRoot(animationMetadata = DEFAULT_MODAL_ANIMATION_METADATA): ModuleWithProviders<ModalModule> {
        return {
            ngModule: ModalModule,
            providers: [
                {provide: ANIMATION_METADATA_TOKEN, useValue: animationMetadata},
            ]
        };
    }   
}
