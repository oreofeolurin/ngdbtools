import { InjectionToken } from '@angular/core';

export const ANIMATION_METADATA_TOKEN = new InjectionToken<ModalAnimationMetadata>('MODAL_ANIMATION_METADATA');

export interface ModalAnimationMetadata {
    start?: ModalStateAnimateMetadata;
    enter: ModalStateAnimateMetadata;
    leave: ModalStateAnimateMetadata;
}

export interface ModalStateAnimateMetadata {
    duration?: number;
    vars: any;
}

export function modalAnimate(enter: ModalStateAnimateMetadata, leave: ModalStateAnimateMetadata): ModalAnimationMetadata;
export function modalAnimate(start: ModalStateAnimateMetadata, enter: ModalStateAnimateMetadata, leave?: ModalStateAnimateMetadata): ModalAnimationMetadata;
export function modalAnimate(start: ModalStateAnimateMetadata, enter: ModalStateAnimateMetadata, leave?: ModalStateAnimateMetadata): ModalAnimationMetadata {
    if (leave) {
        return { start, enter, leave };
    }
    return { enter: start, leave: enter}
}

export function stateAnimate(duration: number, vars: any): ModalStateAnimateMetadata;
export function stateAnimate(vars: any): ModalStateAnimateMetadata;
export function stateAnimate(durationOrVars: number | object, vars?: gsap.TweenVars): ModalStateAnimateMetadata {
    if (typeof durationOrVars == "number" && vars) {
        return { duration: durationOrVars, vars };
    } else if (durationOrVars && typeof durationOrVars === 'object' && !Array.isArray(durationOrVars)) {
        return { vars: durationOrVars };
    }
    throw TypeError('Invalid ModalAnimationMetadata arguments');
}


export const DEFAULT_MODAL_ANIMATION_METADATA: ModalAnimationMetadata =
    modalAnimate(
        stateAnimate({ xPercent: 0 }),
        stateAnimate(.5, { backgroundColor: 'rgba(0, 0, 0, 0.70)', display: 'flex', opacity: 1 }),
        stateAnimate(.5, { opacity: 0, display: 'none' })
    );


