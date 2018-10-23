import {
    Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver,
    Inject, PLATFORM_ID, Injector, ElementRef
} from '@angular/core';
import {isPlatformServer} from '@angular/common';
import {TweenLite} from 'gsap';
import {ModalExistRef, ModalRef} from './models';
import {noop, Subscription} from 'rxjs';
import {ModalService} from './modal.service';

@Component({
    selector: 'db-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy {

    public modalRef: ModalRef;
    private newModalSubscription: Subscription;
    private modalExitSubscription: Subscription;
    private currentComponent = null;

    @ViewChild('modalView')
    public modalView: ElementRef;

    @ViewChild('componentContainer', {read: ViewContainerRef})
    public componentContainer: ViewContainerRef;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                @Inject(ComponentFactoryResolver) private resolver: ComponentFactoryResolver,
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

        const inputProviders = [{provide: ModalRef, useValue: modalRef}];

        // We create an injector out of the data we want to pass down and this components injector
        const injector = Injector.create({
            providers: inputProviders,
            parent: this.componentContainer.parentInjector
        });

        // We create a factory out of the component we want to create
        const factory = this.resolver.resolveComponentFactory(modalRef.modal.component);

        // We create the component using the factory and the injector
        const component = factory.create(injector);

        // We insert the component into the dom container
        this.componentContainer.insert(component.hostView);

        // Destroy the previously created component
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = component;

        // reveal animation
        this.reveal();

    }

    public contentLayerClick(event) {
        if (this.modalRef.modal.closeOnOuterClick && event.srcElement.classList.contains('db-modal-content-layer')) {
            this.exitView();
        }
    }


    public reveal() {
        TweenLite.set('body', {overflow: 'hidden'});
        const duration = this.modalRef.modal.animation.enter.duration;
        const vars = this.modalRef.modal.animation.enter.vars;

        TweenLite.to(this.modalView.nativeElement, duration, vars);
    }

    public removeView(ref?: ModalExistRef) {
        TweenLite.set('body', {'overflow-y': 'auto'});
        const duration = this.modalRef.modal.animation.leave.duration;
        const vars = Object.assign(this.modalRef.modal.animation.leave.vars, {
            onComplete: () => {
                // make sure to check its the current tag, because anything can happen after 500ms
                if (ref.tag === this.currentComponent.instance.tag) {
                    this.currentComponent.destroy();
                }
            }
        });

        TweenLite.to(this.modalView.nativeElement, duration, vars);

    }

    public exitView(ref?: ModalExistRef) {
        if (typeof ref === 'undefined') {
            return this.modalRef.close(null, true);
        }

        this.removeView(ref);
    }

    public ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.modalExitSubscription ? this.modalExitSubscription.unsubscribe() : noop();
        this.newModalSubscription ? this.newModalSubscription.unsubscribe() : noop();
    }
}
