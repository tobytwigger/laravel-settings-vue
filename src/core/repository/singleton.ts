import { Repository } from '../../types/core';

class Singleton implements Repository {
    settings: ESSettings;
    onUpdate: { (key: string, value: any): void }[] = [];

    private static instance: Singleton;

    private constructor() {
        this.settings = {};
    }

    onSettingUpdated(callback: (key: string, value: any) => void): void {
        this.onUpdate.push(callback);
    }

    getSettings(): ESSettings {
        return this.settings;
    }

    getSetting(key: string): any {
        return this.settings[key];
    }

    hasSetting(key: string): boolean {
        return this.settings.hasOwnProperty(key);
    }

    private triggerSettingUpdate(key: string, value: any): void {
        this.onUpdate.forEach((callback: (key: string, value: any) => void) => {
            callback(key, value);
        });
    }

    addSettings(settings: ESSettings): Singleton {
        Object.keys(settings).forEach((key: string) => {
            this.triggerSettingUpdate(key, settings[key]);
        });
        this.settings = { ...this.settings, ...settings };
        return this;
    }

    reset(): Singleton {
        this.settings = {};
        return this;
    }

    only(keys: Array<string>): ESSettings {
        let settings: ESSettings = {};
        keys.filter((key: string) => this.hasSetting(key)).forEach(
            (key: string) => (settings[key] = this.getSetting(key)),
        );

        return settings;
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}

export default Singleton;
