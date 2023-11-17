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
var PhoneNumberTranslator = /** @class */ (function (_super) {
    __extends(PhoneNumberTranslator, _super);
    function PhoneNumberTranslator(name, opts) {
        return _super.call(this, name, opts) || this;
    }
    PhoneNumberTranslator.prototype.regexp = function () {
        return "" +
            "(?:\\+(?<".concat(this.capName("intl_code"), ">\\d{1,3})\\s+)?") +
            "(?:\\(?(?<".concat(this.capName("area_code"), ">\\d{2,5})\\)?\\s+)?") +
            "(?<".concat(this.capName("number"), ">(?:[0-9\\-\\(\\)\\/\\.]\\s?){5,15})");
    };
    PhoneNumberTranslator.prototype.create = function (matched) {
        var internationalCode = this.fromAsString(matched, "intl_code"), areaCode = this.fromAsString(matched, "area_code"), number = this.fromAsString(matched, "number");
        return { internationalCode: internationalCode, areaCode: areaCode, number: number };
    };
    return PhoneNumberTranslator;
}(base_translator_1.default));
exports.default = PhoneNumberTranslator;
