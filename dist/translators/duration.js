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
var parse_duration_1 = require("parse-duration");
var DurationTranslator = /** @class */ (function (_super) {
    __extends(DurationTranslator, _super);
    function DurationTranslator(name, opts) {
        return _super.call(this, name, opts) || this;
    }
    DurationTranslator.prototype.regexp = function () {
        var name = this.name;
        var num = "[-]?(\\d+(\\.\\d+)?|\\.\\d+)([eE][+-]?\\d+)?";
        return "" +
            "(?:".concat(num, "(?:years|year|y|yr))?") +
            "\\s*" +
            "(?:".concat(num, "(?:months|month))?") +
            "\\s*" +
            "(?:".concat(num, "(?:weeks|week|wk|w))?") +
            "\\s*" +
            "(?:".concat(num, "(?:days|day|d))?") +
            "\\s*" +
            "(?:".concat(num, "(?:hours|hour|hr|h))?") +
            "\\s*" +
            "(?:".concat(num, "(?:minutes|minute|min|m))?") +
            "\\s*" +
            "(?:".concat(num, "(?:seconds|second|sec|s))?") +
            "\\s*" +
            "(?:".concat(num, "(?:millseconds|millsecond|ms))?") +
            "\\s*" +
            "(?:".concat(num, "(?:microseconds|microsecond|\u03BCs))?") +
            "\\s*" +
            "(?:".concat(num, "(?:nanoseconds|nanosecond|ns))?");
    };
    DurationTranslator.prototype.create = function (matched) {
        var raw = this.entireMatch(matched), val = (0, parse_duration_1.default)(raw), millis = { raw: raw, val: val };
        return { millis: millis };
    };
    return DurationTranslator;
}(base_translator_1.default));
exports.default = DurationTranslator;
