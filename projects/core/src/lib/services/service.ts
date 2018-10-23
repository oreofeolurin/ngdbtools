import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Utils} from '../helpers';
import {Observable} from 'rxjs';
import {Exception} from '../exceptions/custom.exception';
import {AppException} from '../exceptions/app.exception';

interface RequestOpts {
    method: string;
    url: string;
    options: object;
}

export class Service<T> {

    /**
     * Service constructor.
     *
     * @constructor
     * @param http
     * @param apiBase
     */
    public constructor(protected http: HttpClient, protected apiBase: string) {
    }


    // noinspection JSMethodCanBeStatic
    protected getCombinedHeaders(headers: HttpHeaders) {
        if (headers.get('Content-Type') === null) {
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    }


    /**
     * Prepares request object to send to server.
     *
     * @param {string} url - Request url.
     * @param {Object} body - Request Body.
     * @param method
     * @param params
     * @param {Headers} headers - Request Headers.
     * @param apiBase
     * @param observe
     * @return {Request}
     */
    public prepareRequest(url: string,
                          body: Object = null,
                          method: string = 'POST',
                          params = null,
                          headers: HttpHeaders = new HttpHeaders(),
                          apiBase: string = this.apiBase,
                          observe: string = 'body'): RequestOpts {

        const combinedHeaders = this.getCombinedHeaders(headers);

        if (params !== null) {
            params = new HttpParams({fromObject: params});
        }

        if (headers.get('Content-Type') === 'application/x-www-form-urlencoded' && method === 'POST') {
            body = Utils.URIEncodeObject(body);
        }

        return {method, url: apiBase + url, options: {body, headers: combinedHeaders, params: params, observe}};
    }


    /**
     * Sends request object to server and handles apropiate callbacks.
     *
     * @param {RequestOpts} requestOpts Request object
     * @return {Observable<RResponse>}
     */
    public sendToServer(requestOpts: RequestOpts): Observable<T> {
        return this.http.request<T>(requestOpts.method, requestOpts.url, requestOpts.options);
    }


    /**
     * Sends a GET Request
     *
     * @param {string} url
     * @param {object} paramsObject
     * @param {HttpHeaders} headers
     * @param {string} apiBase
     * @param observe
     */
    public sendGetRequest(url: string,
                          paramsObject?: object,
                          headers?: HttpHeaders,
                          apiBase?: string,
                          observe?: string) {

        return this.sendRequest(url, null, 'GET', paramsObject, headers, apiBase, observe);

    }

    /**
     * Sends a GET Request
     *
     * @param {string} url
     * @param {object} paramsObject
     * @param {HttpHeaders} headers
     * @param {string} apiBase
     */
    public sendDeleteRequest(url: string,
                          paramsObject?: object,
                          headers?: HttpHeaders,
                          apiBase?: string) {

        return this.sendRequest(url, null, 'DELETE', paramsObject, headers, apiBase);

    }

    /**
     * Sends a PUT Request
     *
     * @param {string} url
     * @param {object} body
     * @param {HttpHeaders} headers
     * @param {string} apiBase
     */
    public sendPutRequest(url: string,
                           body?: object,
                           headers?: HttpHeaders,
                           apiBase?: string) {

        return this.sendRequest(url, body, 'PUT', null, headers, apiBase);

    }

    /**
     * Sends a POST Request
     *
     * @param {string} url
     * @param {object} body
     * @param {HttpHeaders} headers
     * @param {string} apiBase
     */
    public sendPostRequest(url: string,
                           body?: object,
                           headers?: HttpHeaders,
                           apiBase?: string) {

        return this.sendRequest(url, body, 'POST', null, headers, apiBase);

    }




    /**
     * Builds the RequestOpts and sends to server immediately
     *
     * @param {string} url
     * @param {Object} body
     * @param {string} method
     * @param {any} paramsObject
     * @param {HttpHeaders} headers
     * @param apiBase
     * @param observe
     * @return {Observable<RResponse>}
     */
    public sendRequest(url: string,
                       body: Object = null,
                       method: string = body == null ? 'GET' : 'POST',
                       paramsObject?: object,
                       headers?: HttpHeaders,
                       apiBase?: string,
                       observe?: string) {

        const requestOpts = this.prepareRequest(url, body, method, paramsObject, headers, apiBase, observe);

        return this.sendToServer(requestOpts);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * TODO: send the error to remote logging infrastructure
     *
     * @param operation - name of the operation that failed
     *
     */
    public handleError(operation = 'operation') {
        return (err: any) => {
            throw this.catchErrors(err);
        };
    }


    /**
     * Utility function to catch errors
     * basically it checks if its an unauthorised error
     * it logs out immediately if its an unauthorised error
     *
     * @param err
     */
    private  catchErrors(err: HttpErrorResponse): Exception {
        let error;

        console.log(err);

        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            error = new AppException(err.error);

        } else if (err.status === 0) {
            error = AppException.INTERNET_UNAVAILABLE;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            error = new AppException(err.error.error, err.error.code, err.error.message, err.error.body);
        }
        return error;
    }
}
