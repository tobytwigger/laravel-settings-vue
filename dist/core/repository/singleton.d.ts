import { Repository } from "../../types/core";
declare class Singleton implements Repository {
    settings: ESSettings;
    private static instance;
    private constructor();
    getSettings(): ESSettings;
    getSetting(key: string): any;
    hasSetting(key: string): boolean;
    addSettings(settings: ESSettings): Singleton;
    reset(): Singleton;
    static getInstance(): Singleton;
}
export default Singleton;
