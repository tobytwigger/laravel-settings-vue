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
                unit_system: 'xyz'
            }
        });
        Object.defineProperty(VueInstance.prototype, '$setting', {
            get: function () {
                console.log('IN THE GETTER');
                return setting.value;
            },
            set: function (value) {
                console.log('IN THE SETTER');
                setting.value = value;
            }
        });
        var settings = (0, settings_1.default)(options.axios, (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : settings_1.SettingType.Singleton);
        settings.repository.onSettingUpdated(function (key, value) {
            var _a;
            var newSettings = (_a = VueInstance.prototype.$setting) !== null && _a !== void 0 ? _a : {};
            newSettings[key] = value;
            VueInstance.prototype.$setting = newSettings;
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