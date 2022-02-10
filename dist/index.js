"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
var windowAccessor_1 = require("./core/windowAccessor");
var vue_1 = require("vue");
var settings_1 = require("./core/settings");
exports.installer = {
    install: function (VueInstance, options) {
        var _a;
        var setting = vue_1.default.observable({
            value: {
                unit_system: '123'
            }
        });
        Object.defineProperty(VueInstance.prototype, '$setting', {
            get: function () {
                return setting.value;
            },
            set: function (value) {
                setting.value = value;
            }
        });
        var settings = (0, settings_1.default)(options.axios, (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : settings_1.SettingType.Singleton);
        settings.repository.onSettingUpdated(function (key, value) {
            console.log('Setting ' + key + ' to ' + value);
            vue_1.default.set(VueInstance.prototype.$setting, key, value);
        });
        settings.repository.addSettings((0, windowAccessor_1.allSettings)());
        Object.defineProperty(VueInstance.prototype, '$settings', {
            get: function () {
                return settings;
            }
        });
    },
};
exports.default = exports.installer;
//# sourceMappingURL=index.js.map