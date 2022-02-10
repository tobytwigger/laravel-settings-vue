"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingType = exports.Settings = void 0;
var singleton_1 = require("./repository/singleton");
var Settings = (function () {
    function Settings(repository, axios) {
        var _this = this;
        this.repository = repository;
        this.axios = axios;
        this.repository.onSettingUpdated(function (key, value) { return Settings.updateLocalSettingProperty(key, value, _this); });
    }
    Settings.updateLocalSettingProperty = function (key, value, target) {
    };
    Settings.prototype.setValue = function (key, value) {
        var settings = {};
        settings[key] = value;
        return this.setValues(settings);
    };
    Settings.prototype.setValues = function (values) {
        var _this = this;
        var currentValues = this.repository.only(Object.keys(values));
        this.repository.addSettings(values);
        this.axios.post('/api/settings/setting', { settings: values })
            .then(function (response) {
            _this.repository.addSettings(response.data);
        })
            .catch(function (error) { return _this.repository.addSettings(currentValues); });
        return this;
    };
    Settings.prototype.getValue = function (key) {
        if (this.repository.hasSetting(key)) {
            return this.repository.getSetting(key);
        }
        this.loadSetting(key);
        return undefined;
    };
    Settings.prototype.loadSetting = function (key) {
        return this.loadSettings([key]);
    };
    Settings.prototype.loadSettings = function (keys) {
        var _this = this;
        this.axios.get('/api/settings/setting', {
            params: {
                settings: keys,
                t: new Date().getTime()
            }
        })
            .then(function (response) {
            _this.repository.addSettings(response.data);
        });
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
var createSettings = function (axios, type) {
    if (type === void 0) { type = SettingType.Singleton; }
    if (type === SettingType.Singleton) {
        return new Settings(singleton_1.default.getInstance(), axios);
    }
    if (type === SettingType.LocalStorage) {
        return new Settings(singleton_1.default.getInstance(), axios);
    }
    if (type === SettingType.Vuex) {
        return new Settings(singleton_1.default.getInstance(), axios);
    }
    return new Settings(singleton_1.default.getInstance(), axios);
};
exports.default = createSettings;
//# sourceMappingURL=settings.js.map