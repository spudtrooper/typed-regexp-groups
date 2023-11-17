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
var URLTranslator = /** @class */ (function (_super) {
    __extends(URLTranslator, _super);
    function URLTranslator(name, opts) {
        return _super.call(this, name, opts) || this;
    }
    URLTranslator.prototype.regexp = function () {
        // https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
        return '' +
            // protocol
            /**/ 'https?:\/\/' +
            // domain name
            /**/ '(?:' +
            /**/ '(?:' +
            /**/ '(?:[a-z\\d]' +
            /**/ '(?:' +
            /**/ '[a-z\\d-]*[a-z\\d]' +
            /**/ ')*' +
            /**/ ')\.' +
            /**/ ')+' +
            /**/ '[a-z]{2,}' +
            /**/ '|' + // OR
            // ip (v4) address
            /**/ '(?:' +
            /**/ '(?:' +
            /**/ '\\d{1,3}\.' +
            /**/ '){3}' +
            /**/ '\\d{1,3}' +
            /**/ ')' +
            // end domain name
            /**/ ')' +
            // port
            /**/ '(?:' +
            /**/ '\\:\\d+' +
            /**/ ')?' +
            // path
            /**/ '(?:' +
            /**/ '\/[-a-z\\d%_.~+]*' +
            /**/ ')*' +
            // query string
            /**/ '(?:' +
            /**/ '\\?[;&a-z\\d%_.~+=-]*' +
            /**/ ')?' +
            // fragment locator
            /**/ '(?:' +
            /**/ '\\#[-a-z\\d_]*' +
            /**/ ')?' +
            // end
            /**/ '';
    };
    URLTranslator.prototype.create = function (matched) {
        var url = this.entireMatch(matched);
        return new URL(url);
    };
    return URLTranslator;
}(base_translator_1.default));
exports.default = URLTranslator;
