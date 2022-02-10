import {Repository} from "../../types/core";

class Singleton implements Repository {
    settings: ESSettings;

    private static instance: Singleton;

    private constructor() {
        this.settings = {};
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

    addSettings(settings: ESSettings): Singleton {
        this.settings = {...this.settings, ...settings};
        return this;
    }

    reset(): Singleton {
        this.settings = {};
        return this;
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }
}

export default Singleton;