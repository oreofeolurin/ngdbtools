export interface UIState {
    loading: boolean;
    error: null;
    notification: UIStateNotification;
}

export interface UIStateNotification {
    message: string;
    type: 'error' | 'success';
}

export interface UIActionsInterface {
    load(): any;

    loadDone(): any;

    loadNotification(notification: UIStateNotification): any;

    removeNotification(): any;
}
