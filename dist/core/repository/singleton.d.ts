import { Repository } from '../../types/core';
declare class Singleton implements Repository {
    settings: ESSettings;
    onUpdate: {
        (key: string, value: any): void;
    }[];
    private static instance;
    private constructor();
    onSettingUpdated(callback: (key: string, value: any) => void): void;
    getSettings(): ESSettings;
    getSetting(key: string): any;
    hasSetting(key: string): boolean;
    private triggerSettingUpdate;
    addSettings(settings: ESSettings): Singleton;
    reset(): Singleton;
    only(keys: Array<string>): ESSettings;
    static getInstance(): Singleton;
}
export default Singleton;
