import {Inject, Injectable} from '@angular/core';
import {Modal, ModalExistRef, ModalRef} from './models';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {MODAL_ANIMATION_METADATA, ModalAnimationMetadata} from './modal-animation-metadata';

@Injectable()
export class ModalService {

    // Observable string sources
    private modalExitSubject = new Subject<ModalExistRef>();
    private newModalSubject = new BehaviorSubject<ModalRef>(null);

    // Observable string streams
    public modalExitStream = this.modalExitSubject.asObservable();
    public newModalStream = this.newModalSubject.asObservable();

    constructor(@Inject(MODAL_ANIMATION_METADATA) private animation: ModalAnimationMetadata) {
    }

    /**
     * @deprecated
     */
    public notifyModalExit(tag: string, resolve: any, forceClose?: boolean) {
        if (typeof forceClose === 'undefined') {
            forceClose = false;
        }
        this.modalExitSubject.next({tag: tag, resolve: resolve, forceClose: forceClose});
    }


    /**
     * @deprecated
     */
    public loadModal(modal: Modal) {
        if (this.animation && modal.isDefaultAnimation) {
            modal.animation = this.animation;
        }
        const modalRef = new ModalRef(modal, this.modalExitSubject);
        this.newModalSubject.next(modalRef);

        return modalRef;
    }

    public load(modal: Modal) {
        if (this.animation && modal.isDefaultAnimation) {
            modal.animation = this.animation;
        }
        const modalRef = new ModalRef(modal, this.modalExitSubject);
        this.newModalSubject.next(modalRef);

        return modalRef;
    }

    public open(modal: Modal): Observable<ModalExistRef> {
        return this.load(modal).onExit();
    }

}
