/**
 * Created by EdgeTech on 8/31/2016.
 */

import { ModalData } from "../models";


export class DialogAction {
    public static NEUTRAL = 'ACTION_NEUTRAL';
    public static SUCCESS = 'ACTION_SUCCESS';
    public static ERROR = 'ACTION_ERROR';
    public static PROCEED = new DialogAction('Okay', DialogAction.SUCCESS, true);
    public static RECEDE = new DialogAction('Cancel', DialogAction.NEUTRAL, false);


    public text: string;
    public type: string;
    public resolve: boolean;
    public disabled = false;

    constructor(text: string, type: string, resolve: boolean) {
        this.text = text;
        this.type = type;
        this.resolve = resolve;
    }

    public setText(text: string): DialogAction {
        this.text = text;
        return this;
    }

    public setType(type: string): DialogAction {
        this.type = type;
        return this;
    }

    public disable(): DialogAction {
        this.disabled = true;
        return this;
    }
}

export class Dialog {

    public static DIALOG_DATA_KEY = 'db-dialog';

    public title: string;
    public message?: string;

    public recedeAction: DialogAction = DialogAction.RECEDE;
    public proceedAction: DialogAction = DialogAction.PROCEED;


    constructor(title: string, message?: string) {
        this.title = title;
        this.message = message;
    }


    public setMessage(message: string) {
        this.message = message;
        return this;
    }

    public setRecedeAction(action: DialogAction) {
        this.recedeAction = action;
        return this;
    }

    public setProceedAction(action: DialogAction) {
        this.proceedAction = action;
        return this;
    }
}

export function DialogData(dialog: Dialog) {
    return new ModalData(Dialog.DIALOG_DATA_KEY, dialog);
}