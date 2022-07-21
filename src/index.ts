import { allSettings } from './core/windowAccessor';
import Vue from 'vue';

type VueOptions = import('./types/vue').VueOptions;

import createSettings, { SettingType } from './core/settings';

export const installer = {
    install(VueInstance: any, options: VueOptions) {
        let settingStore = {};
        let settingValue = {
            value: new Proxy(settingStore, {
                set(fullSettings: ESSettings, key: string|symbol, value: any, receiver) {
                    if(typeof key === 'string') {
                        if(!settingCopy.hasOwnProperty(key) || settingCopy[key] !== value) {
                            settingCopy[key] = value;
                            settings.setValue(key, value);
                        }
                        fullSettings[key] = value;
                    }
                    return true;
                },
                get: function(fullSettings: { [key: string|symbol]: any }, key: string|symbol, receiver) {
                    let allowedValues = [
                        '_isVue', '__v_skip', '__v_isRef', '__v_isReadonly', '__ob__'
                    ]
                    if(typeof key === 'string'
                        && !allowedValues.includes(key)
                        && !fullSettings.hasOwnProperty(key)
                        && typeof settings !== 'undefined') {
                        settings.loadSetting(key);
                        return undefined;
                    }
                    return fullSettings[key];
                }
            })
        }
        const setting = Vue.observable(settingValue);
        let settingCopy: ESSettings = {};

        Object.defineProperty(VueInstance.prototype, '$setting', {
            get() {
                return setting.value;
            },
            set(updatedSettings) {
                setting.value = updatedSettings;
            },
        });

        let settings = createSettings(options.axios, options?.type ?? SettingType.Singleton);
        settings.repository.onSettingUpdated((key, value) => {
            settingCopy[key] = value;
            Vue.set(VueInstance.prototype.$setting, key, value);
        });

        settings.repository.addSettings(allSettings());

        Object.defineProperty(VueInstance.prototype, '$settings', {
            get() {
                return settings;
            },
        });
    },
};

export default installer;
