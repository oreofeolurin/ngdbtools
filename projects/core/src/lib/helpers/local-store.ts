const STORAGE = (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') ? window.localStorage : null;

export function LocalStoreFactory(localStorageName: string) {
    return new LocalStore(localStorageName || 'app-store');
}

export class LocalStore {

    constructor(private localStorageName: string) {
    }

    setLocalStorageName(name) {
        this.localStorageName = name;
    }

    /**
     *
     * append to an array in the store
     */

    public removeFromStore(key: string, data: any, storeKey = this.localStorageName): boolean {

        if (STORAGE == null) {
            return false;
        }

        const rawStore = STORAGE.getItem(storeKey);

        // parse if items exist
        if (rawStore) {
            STORAGE.removeItem(key);
            return true;
        }

        return false;

    }


    public removeFromStoreArray(key: string, data: any): boolean {

        if (STORAGE == null) {
            return false;
        }

        let store;
        const rawStore = STORAGE.getItem(this.localStorageName);

        // parse if items exist
        if (rawStore) {
            store = JSON.parse(rawStore);

            // lets remove the data
            store[key] = store[key].filter((value) => value !== data);


            const string = JSON.stringify(store);
            STORAGE.setItem(this.localStorageName, string);

            return true;
        }

        return false;

    }


    /**
     * append to an array in the store
     */

    public appendToStore(key: string, data: any): boolean {

        if (STORAGE == null) {
            return false;
        }

        let store;
        const rawStore = STORAGE.getItem(this.localStorageName);

        // parse if items exist
        if (rawStore) {
            store = JSON.parse(rawStore);

            store[key] = store[key] || [];

            if (!store[key].includes(key)) {
                store[key].push(data);
            }

            const string = JSON.stringify(store);
            STORAGE.setItem(this.localStorageName, string);

            return true;
        }

        return false;

    }


    /**
     * append to an array in the store
     */

    public getFromStore<T>(key: string, storeKey = this.localStorageName): T | any {

        if (STORAGE == null) {
            return null;
        }

        let store;
        const rawStore = STORAGE.getItem(storeKey);

        // parse if items exist
        if (rawStore) {
            store = JSON.parse(rawStore);
            return store[key];
        }

        return false;
    }

    public saveToStore(key: string, data: any, storeKey = this.localStorageName): boolean {

        if (STORAGE == null) {
            return false;
        }

        let store;
        const rawStore = STORAGE.getItem(storeKey);

        // parse if items exist
        store = rawStore ? JSON.parse(rawStore) : {};
        store[key] = data;

        STORAGE.setItem(this.localStorageName, JSON.stringify(store));

        return true;
    }


    public deleteStore(key: string): boolean {

        if (STORAGE == null) {
            return false;
        }

        STORAGE.removeItem(key);

        return true;
    }
}
