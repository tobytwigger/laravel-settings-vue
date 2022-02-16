import { allSettings } from './core/windowAccessor';
import Vue from 'vue';

type VueOptions = import('./types/vue').VueOptions;

import createSettings, { SettingType } from './core/settings';

export const installer = {
    install(VueInstance: any, options: VueOptions) {
        const setting = Vue.observable({
            // Observability only works on the properties of objects, so we have a value property which should be reactive
            value: {
                // unit_system: '123'
            },
        });
        // Holds what we expect the settings to be, non reactive. If when updating a setting there is a difference, that setting has been set by another means and should be updated
        const settingCopy: ESSettings = {};

        Object.defineProperty(VueInstance.prototype, '$setting', {
            get() {
                return setting.value;
            },
            set(updatedSettings) {
                console.log(updatedSettings);
                // Get changed values comparing the setting copy and setting.
                Object.keys(updatedSettings)
                    .filter(
                        (key: string) =>
                            this.setting.value.hasOwnProperty(key) && this.setting.value[key] === updatedSettings[key],
                    )
                    .forEach((key: string) => {
                        console.log(key);
                        settingCopy[key] = updatedSettings[key];
                        // settings.setValue(key, updatedSettings[key])
                    });

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
