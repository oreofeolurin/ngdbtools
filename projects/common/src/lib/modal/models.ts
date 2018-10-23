import {Type} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Utils} from '@ngdbtools/core';
import {DEFAULT_MODAL_ANIMATION_METADATA, ModalAnimationMetadata} from './modal-animation-metadata';

export interface ModalExistRef {
    tag: string;
    resolve: any;
    forceClose: boolean;
}


export interface ModalOptions {
    component: Type<any>;
    data: ModalData;
    closeOnOuterClick?: boolean;
    animation?: ModalAnimationMetadata;
}

export class ModalRef {

    constructor(public readonly modal: Modal, private exitSubject: Subject<ModalExistRef>) {
    }

    /**
     * Gets an observable that is notified when the dialog is finished closing.
     *
     * */
    public onExit(): Observable<ModalExistRef> {
        return this.exitSubject.asObservable();
    }


    public close(resolve: any, forceClose?: boolean) {
        if (typeof forceClose === 'undefined') {
            forceClose = false;
        }
        this.exitSubject.next({tag: this.modal.tag, resolve: resolve, forceClose: forceClose});
    }

    public getData<T = any>(key): T {
        return this.modal.data.get(key);
    }
}

export class ModalData<T = any> {
    private map = new Map<string, T>();


    constructor(key: string, value: T) {
        this.map.set(key, value);
    }

    public add(key: string, value: any) {
        this.map.set(key, value);
    }

    get(key: string): T {
        return this.map.get(key);
    }
}

export class Modal {
    public readonly tag: string;
    public readonly isDefaultAnimation: boolean;
    public readonly component: Type<any>;
    public readonly data: ModalData;
    public readonly closeOnOuterClick: boolean;
    public animation: ModalAnimationMetadata;

    constructor(component: Type<any>,
                data?: ModalData,
                closeOnOuterClick: boolean = true,
                animation?: ModalAnimationMetadata) {

        this.tag = Utils.generateRandomID(10).toUpperCase();
        this.component = component;
        this.closeOnOuterClick = closeOnOuterClick;

        this.isDefaultAnimation = !animation;
        this.animation = animation || DEFAULT_MODAL_ANIMATION_METADATA;

        this.data = data;
    }

    static create(options: ModalOptions) {
        return new Modal(options.component, options.data, options.closeOnOuterClick, options.animation);
    }

}


