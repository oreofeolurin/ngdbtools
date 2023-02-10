import {
    Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver,
    Inject, PLATFORM_ID, Injector, ElementRef, ComponentRef
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { gsap } from "gsap";
import { ModalExistRef, ModalRef } from './models';
import { noop, Subscription } from 'rxjs';
import { ModalService } from './modal.service';
import { ModalDirective } from './modal.directive';

@Component({
    selector: 'db-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy {

    public modalRef?: ModalRef;
    private newModalSubscription?: Subscription;
    private modalExitSubscription?: Subscription;
    private currentComponent?: ComponentRef<any>;

    @ViewChild('modalView')
    public modalView!: ElementRef;

    @ViewChild(ModalDirective, { static: true }) modalHost!: ModalDirective;

    @ViewChild('componentContainer', { read: ViewContainerRef })
    public componentContainer!: ViewContainerRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        // @Inject(ComponentFactoryResolver) private resolver: ComponentFactoryResolver,
        @Inject(ModalService) private modalService: ModalService) {
    }

    public ngOnInit() {

        if (isPlatformServer(this.platformId)) {
            return;
        }

        this.newModalSubscription = this.modalService.newModalStream.subscribe(modal => this.load(modal));
        this.modalExitSubscription = this.modalService.modalExitStream.subscribe(modalExitRef => {
            this.exitView(modalExitRef);
        });
    }

    public load(modalRef: ModalRef) {
        if (modalRef == null || isPlatformServer(this.platformId)) {
            return;
        }

        // set the modal
        this.modalRef = modalRef;

        const inputProviders = [{ provide: ModalRef, useValue: modalRef }];

        // We create an injector out of the data we want to pass down and this components injector
        const injector = Injector.create({
            providers: inputProviders,
            parent: this.componentContainer?.injector
        });

        // We create a factory out of the component we want to create
        //const factory = this.resolver.resolveComponentFactory(modalRef.modal.component);

        // We create the component using the factory and the injector
        //const component = factory.create(injector);

        // We insert the component into the dom container
        const componentRef = this.componentContainer?.createComponent(modalRef.modal.component, { injector });
        componentRef.instance.data = modalRef.modal.data;
        componentRef.instance.tag = modalRef.modal.tag;

        // Destroy the previously created component
        if (this.currentComponent) {
            this.currentComponent?.destroy();
        }

        this.currentComponent = componentRef;

        // reveal animation
        this.reveal(modalRef);

    }

    loadDirective(modalRef: ModalRef) {
        if (modalRef == null || isPlatformServer(this.platformId)) {
            return;
        }

        // set the modal
        this.modalRef = modalRef;

        const inputProviders = [{ provide: ModalRef, useValue: modalRef }];

        // We create an injector out of the data we want to pass down and this components injector
        const injector = Injector.create({
            providers: inputProviders,
            parent: this.componentContainer?.injector
        });


        const viewContainerRef = this.modalHost.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(modalRef.modal.component, { injector });
        componentRef.instance.data = modalRef.modal.data;
        componentRef.instance.tag = modalRef.modal.tag;

        this.currentComponent = componentRef;


        // reveal animation
        this.reveal(modalRef);
    }

    public contentLayerClick(event: any) {
        if (this.modalRef?.modal.closeOnOuterClick && event.srcElement.classList.contains('db-modal-content-layer')) {
            this.exitView();
        }
    }


    public reveal(modalRef: ModalRef) {
        gsap.set('body', { overflow: 'hidden' });
        const duration = modalRef.modal.animation.enter.duration ?? 0;
        const startVars = modalRef.modal.animation.start?.vars ?? {};
        const enterVars = modalRef.modal.animation.enter.vars;

        gsap.fromTo(this.modalView.nativeElement, startVars, enterVars).duration(duration);
    }

    public removeView(ref: ModalExistRef) {
        gsap.set('body', { 'overflow-y': 'auto' });
        const duration = this.modalRef?.modal.animation.leave.duration ?? 0;
        const leaveVars = this.modalRef?.modal.animation.leave.vars ?? {};
        const vars = Object.assign(leaveVars, {
            onComplete: () => {
                // make sure to check its the current tag, because anything can happen after 500ms
                if (ref.tag === this.currentComponent?.instance.tag) {
                    this.currentComponent?.destroy();
                }
            }
        });

        gsap.to(this.modalView.nativeElement, vars).duration(duration);

    }

    public exitView(ref?: ModalExistRef) {
        if (typeof ref === 'undefined') {
            return this.modalRef?.close(null, true);
        }

        this.removeView(ref);
    }
    

    public ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.modalExitSubscription ? this.modalExitSubscription.unsubscribe() : noop();
        this.newModalSubscription ? this.newModalSubscription.unsubscribe() : noop();
    }
}
