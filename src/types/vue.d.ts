import Vue from 'vue';
import { SettingType } from '../core/settings';
import { Settings } from './core';
import { Axios } from 'axios';

declare module 'vue/types/vue' {
    interface Vue {
        $settings: Settings;
        $testtwo: string;
    }
}

interface VueOptions {
    type?: SettingType;
    axios: Axios;
}

export { VueOptions };
