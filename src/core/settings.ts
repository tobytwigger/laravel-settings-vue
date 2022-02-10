// const getAllSettings = () => {
//     return reactive({
//         // get all settings
//     })
// }
//
// const getValue = (key) => {
//     // Get value from a setting
// }
//
// const setValue = (key) => {
//     // Use the axios instance and return the promise
// }

import {Repository} from "../types/core";
import Singleton from "./repository/singleton";
import {Axios, AxiosResponse} from "axios";

export class Settings {
    readonly repository: Repository;
    readonly axios: Axios;

    constructor(repository: Repository, axios: Axios) {
        this.repository = repository;
        this.axios = axios;
    }

    setValue(key: string, value: any): void {

    }

    getValue(key: string): any {
        if(this.repository.hasSetting(key)) {
            return this.repository.getSetting(key);
        }
        this.loadSetting(key);
        return undefined;
    }

    /*
    Dynamic getter. I can say this.$settings.siteName and it'll be null, then suddenly something. Or just something
     */

    loadSetting(key: string): Settings {
        return this.loadSettings([key]);
    }

    loadSettings(keys: Array<String>): Settings {
        this.axios.get('/api/settings/setting', {
            params: {
                settings: keys,
                t: new Date().getTime() // New URL each time to avoid caching
            }
        })
            .then((response: AxiosResponse<ESSettings>) => {
                this.repository.addSettings(response.data)
            });

        return this;
    }
}

export enum SettingType {
    Singleton = 'singleton',
    LocalStorage = 'local',
    Vuex = 'vuex',
}

const createSettings = (axios: Axios, type: SettingType = SettingType.Singleton) => {
    if (type === SettingType.Singleton) {
        return new Settings(Singleton.getInstance(), axios);
    }
    if (type === SettingType.LocalStorage) {
        return new Settings(Singleton.getInstance(), axios);
    }
    if (type === SettingType.Vuex) {
        return new Settings(Singleton.getInstance(), axios);
    }
    return new Settings(Singleton.getInstance(), axios);
};

export default createSettings;