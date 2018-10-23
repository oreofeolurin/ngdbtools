/**
 * The base Exception class
 */
export abstract class Exception {
    private error;

    constructor(
        error: any | string,
        public readonly code: number,
        public readonly message: string) {

        if (typeof error === 'string' && !message) {
            this.message = error;
        } else {
            this.error = error;
        }
    }

    public getError(): any {
        return this.error;
    }

    public getMessage(): string | object {
        return this.message;
    }
}
