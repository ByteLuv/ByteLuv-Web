export type StoreType = {
    uid?: string;
}

class Store {
    store: StoreType;
    constructor(store: StoreType) {
        this.store = store;
    }

    set(key: keyof StoreType, value: any) {
        this.store = {...this.store, [key]: value};
        localStorage.setItem('store', JSON.stringify(this.store));
    }

    get(key: keyof StoreType) {
        this.store = JSON.parse(localStorage.getItem('store') ?? '{}') as StoreType;
        return this.store[key];
    }

    getStore() {
        this.store = JSON.parse(localStorage.getItem('store') ?? '{}') as StoreType;
        return this.store;
    }
}

export const store = new Store({});
