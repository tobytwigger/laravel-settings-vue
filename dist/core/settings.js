"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingType = exports.Settings = void 0;
var singleton_1 = require("./repository/singleton");
var esConfig_1 = require("./esConfig");
var Settings = (function () {
    function Settings(repository, axios) {
        this.loadingSettings = [];
        this.repository = repository;
        this.axios = axios;
    }
    Settings.prototype.setValue = function (key, value) {
        var settings = {};
        settings[key] = value;
        return this.setValues(settings);
    };
    Settings.prototype.setValues = function (values) {
        var _this = this;
        var _a;
        var currentValues = this.repository.only(Object.keys(values));
        this.repository.addSettings(values);
        if ((_a = (0, esConfig_1.getConfig)('api_enabled')) !== null && _a !== void 0 ? _a : true) {
            this.axios
                .post((0, esConfig_1.getConfig)('api_get_url' !== null && 'api_get_url' !== void 0 ? 'api_get_url' : '/api/settings/setting'), { settings: values })
                .then(function (response) { return _this.repository.addSettings(response.data); })
                .catch(function (error) { return _this.repository.addSettings(currentValues); })
                .then(function () { return 'Finished'; });
        }
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
        var _a;
        keys = keys.filter(function (key) { return !_this.isSettingLoading(key); });
        this.markSettingAsLoading(keys);
        if (((_a = (0, esConfig_1.getConfig)('api_enabled')) !== null && _a !== void 0 ? _a : true) && keys.length > 0) {
            this.axios
                .get((0, esConfig_1.getConfig)('api_get_url' !== null && 'api_get_url' !== void 0 ? 'api_get_url' : '/api/settings/setting'), {
                params: {
                    settings: keys,
                    t: new Date().getTime(),
                },
            })
                .then(function (response) {
                _this.repository.addSettings(response.data);
            })
                .finally(function () { return _this.markSettingAsLoaded(keys); });
        }
        return this;
    };
    Settings.prototype.markSettingAsLoading = function (settings) {
        this.loadingSettings = this.loadingSettings.concat(settings);
    };
    Settings.prototype.markSettingAsLoaded = function (settings) {
        this.loadingSettings = this.loadingSettings.filter(function (key) { return !settings.includes(key); });
    };
    Settings.prototype.isSettingLoading = function (key) {
        return this.loadingSettings.includes(key);
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