"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
var settings_1 = require("./core/settings");
exports.installer = {
    install: function (VueInstance, options) {
        var _a;
        VueInstance.prototype.$settings = (0, settings_1.default)(axios, options.axios, (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : settings_1.SettingType.Singleton);
    },
};
exports.default = exports.installer;
//# sourceMappingURL=index.js.map