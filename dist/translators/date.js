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
var base_translator_legacy_1 = require("../base-translator-legacy");
var DateTranslator = /** @class */ (function (_super) {
    __extends(DateTranslator, _super);
    function DateTranslator(name, opts) {
        return _super.call(this, name, opts) || this;
    }
    DateTranslator.prototype.regexp = function () {
        var name = this.name;
        // TODO: This sucks
        return [
            // 01 Jan 1970 00:00:00 GMT
            "\\d{1,2} [A-Z][a-z]{2} \\d{4} \\d{2}:\\d{2}:\\d{2} [A-Z]{3}",
            // 2023-01-02
            "\\d{4}-\\d{2}-\\d{2}",
            // 2023/01/02
            "\\d{4}/\\d{2}/\\d{2}",
            // 01-02-2023
            "\\d{2}-\\d{2}-\\d{4}",
            // 01/02/2023
            "\\d{2}/\\d{2}/\\d{4}",
        ].join("|");
    };
    DateTranslator.prototype.create = function (matched) {
        var date = this.entireMatch(matched);
        return new Date(Date.parse(date));
    };
    return DateTranslator;
}(base_translator_legacy_1.default));
exports.default = DateTranslator;
