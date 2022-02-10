import {allSettings} from "./core/windowAccessor";

type VueOptions = import('./types/vue').VueOptions;

import createSettings, { SettingType } from './core/settings';

export const installer = {
    install(VueInstance: any, options: VueOptions) {
        let settings = createSettings(options.axios, options?.type ?? SettingType.Singleton);

        settings.repository.addSettings(
            allSettings()
        );

        VueInstance.prototype.$settings = settings;

        // Load the global mixin
        // VueInstance.mixin(mixin);
        // Specify the axios instance to use. Save in a singleton or something?
    },
};

export default installer;
