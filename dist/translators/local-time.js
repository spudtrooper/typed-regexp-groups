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
var LocalTimeTranslator = /** @class */ (function (_super) {
    __extends(LocalTimeTranslator, _super);
    function LocalTimeTranslator(name, opts) {
        return _super.call(this, name, opts) || this;
    }
    LocalTimeTranslator.prototype.regexp = function () {
        var name = this.name;
        return "" +
            "(?<".concat(name, "_hours>(?:00|0?[1-9]|1[0-9]|2[0-3]))") +
            "\\s*[:\\.]\\s*" +
            "(?<".concat(name, "_mins>\\d{2})") +
            "(?:\\s*[:\\.]\\s*(?<".concat(name, "_secs>\\d{2}))?") +
            "(?:\\s*[:\\.]\\s*(?<".concat(name, "_millis>\\d{1,3}))?") +
            "(?:\\s*(?<".concat(name, "_amPm>(?:am|AM|a|A|pm|PM|p|P)))?") +
            "".trim();
    };
    LocalTimeTranslator.prototype.create = function (matched) {
        var hoursRaw = this.fromAsString(matched, "hours"), hoursVal = parseInt(hoursRaw), hours = { raw: hoursRaw, val: hoursVal };
        var minsRaw = this.fromAsString(matched, "mins"), minsVal = parseInt(minsRaw), mins = { raw: minsRaw, val: minsVal };
        var secs;
        var secsRaw = this.from(matched, "secs");
        if (secsRaw) {
            var val = parseInt(secsRaw);
            secs = { raw: secsRaw, val: val };
        }
        var millis;
        var millisRaw = this.from(matched, "millis");
        if (millisRaw) {
            var val = parseInt(millisRaw);
            millis = { raw: millisRaw, val: val };
        }
        var isAm;
        var amPm = this.from(matched, "amPm");
        if (amPm) {
            var val = amPm.toLowerCase().startsWith("a");
            isAm = { raw: amPm, val: val };
            if (!val) {
                hours.val += 12;
            }
        }
        return { hours: hours, mins: mins, secs: secs, millis: millis, isAm: isAm };
    };
    return LocalTimeTranslator;
}(base_translator_1.default));
exports.default = LocalTimeTranslator;
