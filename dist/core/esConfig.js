"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.hasConfig = exports.allConfig = void 0;
var allConfig = function () {
    return window.ESSettingsConfig || {};
};
exports.allConfig = allConfig;
var hasConfig = function (key) {
    return allConfig().hasOwnProperty(key);
};
exports.hasConfig = hasConfig;
var getConfig = function (key) {
    if (hasConfig(key)) {
        return allConfig()[key];
    }
    return undefined;
};
exports.getConfig = getConfig;
//# sourceMappingURL=esConfig.js.map