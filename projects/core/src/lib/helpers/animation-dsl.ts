import {AnimationTriggerMetadata} from '@angular/animations/src/animation_metadata';
import {animate, state, style, transition, trigger} from '@angular/animations';


export const STEP_STATE_X_ANIMATION_TRIGGER =
    trigger('stepState', [
        state('active', style({
            opacity: 1,
            transform: 'translateX(0%)'
        })),
        transition('void => *', [
            style({opacity: 0, transform: 'translateX(20%)'}),
            animate(500)
        ])
    ]);

export const STEP_STATE_Y_ANIMATION_TRIGGER: AnimationTriggerMetadata =
    trigger('stepState', [
        state('active', style({
            opacity: 1,
            transform: 'translateY(0px)'
        })),
        transition('void => *', [
            style({opacity: 0, transform: 'translateY(20px)'}),
            animate(500)
        ])
    ]);
