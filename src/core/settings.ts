import Vue from 'vue';

import { Repository } from '../types/core';
import Singleton from './repository/singleton';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import { getConfig } from './esConfig';

export class Settings {
    readonly repository: Repository;
    readonly axios: Axios;

    constructor(repository: Repository, axios: Axios) {
        this.repository = repository;
        this.axios = axios;
    }

    setValue(key: string, value: any): Settings {
        let settings: ESSettings = {};
        settings[key] = value;
        return this.setValues(settings);
    }

    setValues(values: ESSettings): Settings {
        let currentValues = this.repository.only(Object.keys(values));
        this.repository.addSettings(values);
        if (getConfig('api_enabled') ?? true) {
            this.axios
                .post(getConfig('api_get_url' ?? '/api/settings/setting'), { settings: values })
                .then((response: AxiosResponse<ESSettings>) => {
                    this.repository.addSettings(response.data);
                })
                .catch((error: AxiosError) => {
                    console.log(error);
                    this.repository.addSettings(currentValues);
                })
                .then(() => 'Finished');
        }

        return this;
    }

    getValue(key: string): any {
        if (this.repository.hasSetting(key)) {
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
        if (getConfig('api_enabled') ?? true) {
            this.axios
                .get(getConfig('api_get_url' ?? '/api/settings/setting'), {
                    params: {
                        settings: keys,
                        t: new Date().getTime(), // New URL each time to avoid caching
                    },
                })
                .then((response: AxiosResponse<ESSettings>) => {
                    this.repository.addSettings(response.data);
                });
        }

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
