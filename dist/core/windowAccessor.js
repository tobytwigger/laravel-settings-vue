"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSetting = exports.hasSetting = exports.allSettings = void 0;
var allSettings = function () {
    return window.ESSettings || {};
};
exports.allSettings = allSettings;
var hasSetting = function (key) {
    return allSettings().hasOwnProperty(key);
};
exports.hasSetting = hasSetting;
var getSetting = function (key) {
    if (hasSetting(key)) {
        return allSettings()[key];
    }
    return undefined;
};
exports.getSetting = getSetting;
//# sourceMappingURL=windowAccessor.js.map