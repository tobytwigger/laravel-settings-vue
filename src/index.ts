import {allSettings} from "./core/windowAccessor";
import Vue from 'vue';
import mixin from "./vue/mixin";

type VueOptions = import('./types/vue').VueOptions;

import createSettings, { SettingType } from './core/settings';

export const installer = {
    install(VueInstance: any, options: VueOptions) {


        // const setting = Vue.observable({
        //     // Observability only works on the properties of objects, so we have a value property which should be reactive
        //     value: {
        //         unit_system: 'xyz'
        //     }
        // });
        // Object.defineProperty(VueInstance.prototype, '$setting', {
        //     get() {
        //         console.log('IN THE GETTER');
        //         return setting.value
        //     },
        //     set (value) {
        //         console.log('IN THE SETTER')
        //         setting.value = value
        //     }
        // });
        let settings = createSettings(options.axios, options?.type ?? SettingType.Singleton);
        settings.repository.onSettingUpdated((key, value) => {
            let newSettings: ESSettings = VueInstance.prototype.$setting ?? {};
            newSettings[key] = value;
            VueInstance.prototype.$setting = newSettings;
        });
        settings.repository.addSettings(
            allSettings()
        );

        Object.defineProperty(VueInstance.prototype, '$settings', {
            get() {
                return settings;
            }
        });

        // Load the global mixin
        // VueInstance.mixin(mixin);
        // Specify the axios instance to use. Save in a singleton or something?
    },
};

export default installer;
