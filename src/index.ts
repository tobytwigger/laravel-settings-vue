import {allSettings} from "./core/windowAccessor";
import Vue, {PluginObject} from 'vue';
import mixin from "./vue/mixin";

type VueOptions = import('./types/vue').VueOptions;

import createSettings, { SettingType } from './core/settings';

export const installer = {
    install(VueInstance: any, options: VueOptions) {
        const setting = Vue.observable({
            // Observability only works on the properties of objects, so we have a value property which should be reactive
            value: {
                unit_system: '123'
            }
        });
        Object.defineProperty(VueInstance.prototype, '$setting', {
            get() {
                return setting.value
            },
            set (value) {
                setting.value = value
            }
        });

        let settings = createSettings(options.axios, options?.type ?? SettingType.Singleton);
        settings.repository.onSettingUpdated((key, value) => {
            console.log('Setting ' + key + ' to ' + value);
            Vue.set(VueInstance.prototype.$setting, key, value);
        });

        settings.repository.addSettings(
            allSettings()
        );

        Object.defineProperty(VueInstance.prototype, '$settings', {
            get() {
                return settings;
            }
        });
    },
};

export default installer;
