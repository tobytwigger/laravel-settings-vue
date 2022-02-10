import Vue from 'vue';
import { SettingType } from '../core/settings';
import {Settings} from './core';

declare module 'vue/types/vue' {
    interface Vue {
        $settings: Settings;
    }
}



interface VueOptions {
    type?: SettingType;
}

export { VueOptions };
