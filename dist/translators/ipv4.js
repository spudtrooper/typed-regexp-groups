"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_translator_1 = require("../base-translator");
;
var IPv4Translator = /** @class */ (function (_super) {
    __extends(IPv4Translator, _super);
    function IPv4Translator(name, opts) {
        return _super.call(this, name, opts) || this;
    }
    IPv4Translator.prototype.regexp = function () {
        var name = this.name;
        return "(?<".concat(name, "_octect_0>\\d{1,3})\\.(?<").concat(name, "_octect_1>\\d{1,3})\\.(?<").concat(name, "_octect_2>\\d{1,3})\\.(?<").concat(name, "_octect_3>\\d{1,3})");
    };
    IPv4Translator.prototype.create = function (matched) {
        var octects = matched.slice(2).map(function (v) { return parseInt(v); });
        return { octects: octects };
    };
    return IPv4Translator;
}(base_translator_1.default));
exports.default = IPv4Translator;
