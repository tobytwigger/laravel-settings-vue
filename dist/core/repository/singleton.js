"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Singleton = (function () {
    function Singleton() {
        this.onUpdate = [];
        this.settings = {};
    }
    Singleton.prototype.onSettingUpdated = function (callback) {
        this.onUpdate.push(callback);
    };
    Singleton.prototype.getSettings = function () {
        return this.settings;
    };
    Singleton.prototype.getSetting = function (key) {
        return this.settings[key];
    };
    Singleton.prototype.hasSetting = function (key) {
        return this.settings.hasOwnProperty(key);
    };
    Singleton.prototype.triggerSettingUpdate = function (key, value) {
        this.onUpdate.forEach(function (callback) {
            callback(key, value);
        });
    };
    Singleton.prototype.addSettings = function (settings) {
        var _this = this;
        Object.keys(settings).forEach(function (key) {
            _this.triggerSettingUpdate(key, settings[key]);
        });
        this.settings = __assign(__assign({}, this.settings), settings);
        return this;
    };
    Singleton.prototype.reset = function () {
        this.settings = {};
        return this;
    };
    Singleton.prototype.only = function (keys) {
        var _this = this;
        var settings = {};
        keys.filter(function (key) { return _this.hasSetting(key); }).forEach(function (key) { return (settings[key] = _this.getSetting(key)); });
        return settings;
    };
    Singleton.getInstance = function () {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    };
    return Singleton;
}());
exports.default = Singleton;
//# sourceMappingURL=singleton.js.map