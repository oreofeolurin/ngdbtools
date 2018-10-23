import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {LocalStore, LocalStoreKey} from '../helpers';

@Injectable()
export class RequestCacheService {

    get(key): HttpResponse<any> {
        const tuple = LocalStore.getFromStore<[Date, HttpResponse<any>]>(key, LocalStoreKey.CACHE_KEY);
        if (!tuple)  { return null; }

        const expires = tuple[0];
        const httpResponse = tuple[1];

        // Don't observe expired keys
        // const now = new Date();
        // if (expires && expires.getTime() < now.getTime()) {
        //     LocalStore.removeFromStore(key, LocalStoreKey.CACHE_KEY);
        //     return null;
        // }

        return httpResponse;
    }

    set(key, value: HttpResponse<any>, ttl = null) {
        if (ttl) {
            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + ttl);
            LocalStore.saveToStore(key, [expires, value], LocalStoreKey.CACHE_KEY);
        } else {
            LocalStore.saveToStore(key, [null, value], LocalStoreKey.CACHE_KEY);
        }
    }
}
