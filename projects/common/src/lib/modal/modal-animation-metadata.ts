import {InjectionToken} from '@angular/core';

export const MODAL_ANIMATION_METADATA = new InjectionToken<ModalAnimationMetadata>('MODAL_ANIMATION_METADATA');

export interface ModalAnimationMetadata {
    enter: ModalStateAnimateMetadata;
    leave: ModalStateAnimateMetadata;
}

export interface ModalStateAnimateMetadata {
    duration: number;
    vars: any;
}

export function modalAnimate(enter: ModalStateAnimateMetadata, leave: ModalStateAnimateMetadata): ModalAnimationMetadata {
    return {enter, leave};
}

export function stateAnimate(duration: number, vars: any): ModalStateAnimateMetadata {
    return {duration, vars};
}


export const DEFAULT_MODAL_ANIMATION_METADATA: ModalAnimationMetadata =
    modalAnimate(
        stateAnimate(.5, {backgroundColor: 'rgba(0, 0, 0, 0.70)', display: 'flex', opacity: 1}),
        stateAnimate(.5, {opacity: 0, display: 'none'})
    );


