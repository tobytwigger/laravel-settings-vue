// import mixin from './mixin';

type VueOptions = import('./types/vue').VueOptions;

import createSettings, { SettingType } from './core/settings';

export const installer = {
    install(VueInstance: any, options: VueOptions) {
        VueInstance.prototype.$settings = createSettings(axios: options.axios, options?.type ?? SettingType.Singleton);

        // Load the global mixin
        // VueInstance.mixin(mixin);
        // Specify the axios instance to use. Save in a singleton or something?
    },
};

export default installer;
