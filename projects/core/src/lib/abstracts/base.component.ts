import {UIActionsInterface} from '../interfaces/ui.actions.interface';

export abstract class BaseComponent {
    public isGrinding = false;
    public loadingAction = null;
    public activeStep = 0;

    constructor(protected uiActions: UIActionsInterface) {}

    protected setLoading(isLoading = true, loadingAction: string = null) {
        this.uiActions.removeNotification();
        this.isGrinding = isLoading;
        this.loadingAction = isLoading ? loadingAction :  null;
        isLoading ? this.uiActions.load() : this.uiActions.loadDone();
    }

    protected notifyError(err) {
        this.setLoading(false);
        this.uiActions.loadNotification({type: 'error', message: err.message});
    }

    protected notifySuccess(message) {
        this.setLoading(false);
        this.uiActions.loadNotification({type: 'success', message});
    }

    protected clearNotification() {
        this.setLoading(false);
        this.uiActions.removeNotification();
    }

    public getStepState(step: number) {
        return this.activeStep === step ? 'active' : 'inactive';
    }


    public setStepState(step: any) {
        this.activeStep = step;
    }
}
