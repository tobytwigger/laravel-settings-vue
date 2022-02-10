import { Repository } from "../types/core";
import { Axios } from 'axios';
export declare class Settings {
    readonly repository: Repository;
    readonly axios: Axios;
    constructor(repository: Repository, axios: Axios);
    setValue(key: string, value: any): Settings;
    setValues(values: ESSettings): Settings;
    getValue(key: string): any;
    loadSetting(key: string): Settings;
    loadSettings(keys: Array<String>): Settings;
}
export declare enum SettingType {
    Singleton = "singleton",
    LocalStorage = "local",
    Vuex = "vuex"
}
declare const createSettings: (axios: Axios, type?: SettingType) => Settings;
export default createSettings;
