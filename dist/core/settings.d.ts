import { Repository } from '../types/core';
import { Axios } from 'axios';
export declare class Settings {
    readonly repository: Repository;
    readonly axios: Axios;
    private loadingSettings;
    constructor(repository: Repository, axios: Axios);
    setValue(key: string, value: any): Settings;
    setValues(values: ESSettings): Settings;
    getValue(key: string): any;
    loadSetting(key: string): Settings;
    loadSettings(keys: Array<string>): Settings;
    markSettingAsLoading(settings: Array<string>): void;
    markSettingAsLoaded(settings: Array<string>): void;
    isSettingLoading(key: string): boolean;
}
export declare enum SettingType {
    Singleton = "singleton",
    LocalStorage = "local",
    Vuex = "vuex"
}
declare const createSettings: (axios: Axios, type?: SettingType) => Settings;
export default createSettings;
