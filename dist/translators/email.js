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
var email_enum_1 = require("./email-enum");
var EmailTranslator = /** @class */ (function (_super) {
    __extends(EmailTranslator, _super);
    function EmailTranslator(name, opts) {
        return _super.call(this, name, email_enum_1.emailEnum, opts) || this;
    }
    EmailTranslator.prototype.regexp = function () {
        var name = this.name;
        return "(?<".concat(name, "_name>[A-Za-z0-9._%+-]+)@(?<").concat(name, "_domain>[A-Za-z0-9.-]+.[A-Za-z]{2,})");
    };
    EmailTranslator.prototype.create = function (matched) {
        var _a = this.groupMap(matched, this.name), name = _a.name, domain = _a.domain;
        return { name: name, domain: domain };
    };
    return EmailTranslator;
}(base_translator_1.default));
exports.default = EmailTranslator;
