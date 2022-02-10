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

export class Settings {
    readonly repository: Repository;

    constructor(repository: Repository) {
        this.repository = repository;
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
        return this;
    }

    loadSettings(keys: Array<String>): Settings {
        return this;
    }
}

export enum SettingType {
    Singleton = 'singleton',
    LocalStorage = 'local',
    Vuex = 'vuex',
}

const createSettings = (type: SettingType = SettingType.Singleton) => {
    if (type === SettingType.Singleton) {
        return new Settings(Singleton.getInstance());
    }
    if (type === SettingType.LocalStorage) {
        return new Settings(Singleton.getInstance());
    }
    if (type === SettingType.Vuex) {
        return new Settings(Singleton.getInstance());
    }
    return new Settings(Singleton.getInstance());
};

export default createSettings;
