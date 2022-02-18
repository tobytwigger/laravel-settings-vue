import Vue from 'vue';

import { Repository } from '../types/core';
import Singleton from './repository/singleton';
import { Axios, AxiosError, AxiosResponse } from 'axios';
import { getConfig } from './esConfig';

export class Settings {
    readonly repository: Repository;
    readonly axios: Axios;
    private loadingSettings: Array<string> = [];

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
                .then((response: AxiosResponse<ESSettings>) => this.repository.addSettings(response.data))
                .catch((error: AxiosError) => this.repository.addSettings(currentValues))
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

    loadSetting(key: string): Settings {
        return this.loadSettings([key]);
    }

    loadSettings(keys: Array<string>): Settings {
        keys = keys.filter((key) => !this.isSettingLoading(key));
        this.markSettingAsLoading(keys);
        if ((getConfig('api_enabled') ?? true) && keys.length > 0) {
            this.axios
                .get(getConfig('api_get_url' ?? '/api/settings/setting'), {
                    params: {
                        settings: keys,
                        t: new Date().getTime(), // New URL each time to avoid caching
                    },
                })
                .then((response: AxiosResponse<ESSettings>) => {
                    this.repository.addSettings(response.data);
                })
                .finally(() => this.markSettingAsLoaded(keys));
        }

        return this;
    }

    markSettingAsLoading(settings: Array<string>) {
        this.loadingSettings = this.loadingSettings.concat(settings);
    }

    markSettingAsLoaded(settings: Array<string>) {
        this.loadingSettings = this.loadingSettings.filter((key: string): boolean => !settings.includes(key));
    }

    isSettingLoading(key: string): boolean {
        return this.loadingSettings.includes(key);
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
