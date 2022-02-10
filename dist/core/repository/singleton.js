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
        this.settings = {};
    }
    Singleton.prototype.getSettings = function () {
        return this.settings;
    };
    Singleton.prototype.getSetting = function (key) {
        return this.settings[key];
    };
    Singleton.prototype.hasSetting = function (key) {
        return this.settings.hasOwnProperty(key);
    };
    Singleton.prototype.addSettings = function (settings) {
        this.settings = __assign(__assign({}, this.settings), settings);
        return this;
    };
    Singleton.prototype.reset = function () {
        this.settings = {};
        return this;
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