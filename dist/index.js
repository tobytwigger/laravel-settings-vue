"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installer = void 0;
var vue_1 = require("vue");
exports.installer = {
    install: function (VueInstance, options) {
        console.log(VueInstance);
        var testtwo = vue_1.default.observable({
            value: 'initial'
        });
        Object.defineProperty(VueInstance.prototype, '$testtwo', {
            get: function () {
                console.log('IN THE TEST 2 GETTER');
                return testtwo.value;
            },
            set: function (value) {
                console.log('IN THE TEST 2 SETTER');
                testtwo.value = value;
            }
        });
    },
};
exports.default = exports.installer;
//# sourceMappingURL=index.js.map