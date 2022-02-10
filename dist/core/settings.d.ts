import { Repository } from "../types/core";
export declare class Settings {
    readonly repository: Repository;
    constructor(repository: Repository);
    setValue(key: string, value: any): void;
    getValue(key: string): any;
    loadSetting(key: string): Settings;
    loadSettings(keys: Array<String>): Settings;
}
export declare enum SettingType {
    Singleton = "singleton",
    LocalStorage = "local",
    Vuex = "vuex"
}
declare const createSettings: (type?: SettingType) => Settings;
export default createSettings;
