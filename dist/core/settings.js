"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingType = exports.Settings = void 0;
var singleton_1 = require("./repository/singleton");
var Settings = (function () {
    function Settings(repository) {
        this.repository = repository;
    }
    Settings.prototype.setValue = function (key, value) {
    };
    Settings.prototype.getValue = function (key) {
        if (this.repository.hasSetting(key)) {
            return this.repository.getSetting(key);
        }
        this.loadSetting(key);
        return undefined;
    };
    Settings.prototype.loadSetting = function (key) {
        return this;
    };
    Settings.prototype.loadSettings = function (keys) {
        return this;
    };
    return Settings;
}());
exports.Settings = Settings;
var SettingType;
(function (SettingType) {
    SettingType["Singleton"] = "singleton";
    SettingType["LocalStorage"] = "local";
    SettingType["Vuex"] = "vuex";
})(SettingType = exports.SettingType || (exports.SettingType = {}));
var createSettings = function (type) {
    if (type === void 0) { type = SettingType.Singleton; }
    if (type === SettingType.Singleton) {
        return new Settings(singleton_1.default.getInstance());
    }
    if (type === SettingType.LocalStorage) {
        return new Settings(singleton_1.default.getInstance());
    }
    if (type === SettingType.Vuex) {
        return new Settings(singleton_1.default.getInstance());
    }
    return new Settings(singleton_1.default.getInstance());
};
exports.default = createSettings;
//# sourceMappingURL=settings.js.map