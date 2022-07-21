"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
var windowAccessor_1 = require("./core/windowAccessor");
var vue_1 = require("vue");
var settings_1 = require("./core/settings");
exports.installer = {
    install: function (VueInstance, options) {
        var _a;
        var settingStore = {};
        var settingValue = {
            value: new Proxy(settingStore, {
                set: function (fullSettings, key, value, receiver) {
                    if (typeof key === 'string') {
                        if (!settingCopy.hasOwnProperty(key) || settingCopy[key] !== value) {
                            settingCopy[key] = value;
                            settings.setValue(key, value);
                        }
                        fullSettings[key] = value;
                    }
                    return true;
                },
                get: function (fullSettings, key, receiver) {
                    var allowedValues = [
                        '_isVue', '__v_skip', '__v_isRef', '__v_isReadonly', '__ob__'
                    ];
                    if (typeof key === 'string'
                        && !allowedValues.includes(key)
                        && !fullSettings.hasOwnProperty(key)
                        && typeof settings !== 'undefined') {
                        settings.loadSetting(key);
                        return undefined;
                    }
                    return fullSettings[key];
                }
            })
        };
        var setting = vue_1.default.observable(settingValue);
        var settingCopy = {};
        Object.defineProperty(VueInstance.prototype, '$setting', {
            get: function () {
                return setting.value;
            },
            set: function (updatedSettings) {
                setting.value = updatedSettings;
            },
        });
        var settings = (0, settings_1.default)(options.axios, (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : settings_1.SettingType.Singleton);
        settings.repository.onSettingUpdated(function (key, value) {
            settingCopy[key] = value;
            vue_1.default.set(VueInstance.prototype.$setting, key, value);
        });
        settings.repository.addSettings((0, windowAccessor_1.allSettings)());
        Object.defineProperty(VueInstance.prototype, '$settings', {
            get: function () {
                return settings;
            },
        });
    },
};
exports.default = exports.installer;
//# sourceMappingURL=index.js.map