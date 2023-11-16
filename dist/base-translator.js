"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseTranslator = /** @class */ (function () {
    function BaseTranslator(name, opts) {
        if (opts === void 0) { opts = {}; }
        var verbose = opts.verbose;
        this.name = name;
        this._verbose = !!verbose;
    }
    BaseTranslator.prototype.regexp = function () {
        throw new Error("Method not implemented.");
    };
    BaseTranslator.prototype.create = function (matched) {
        throw new Error("Method not implemented.");
    };
    Object.defineProperty(BaseTranslator.prototype, "verbose", {
        get: function () { return this._verbose; },
        enumerable: false,
        configurable: true
    });
    return BaseTranslator;
}());
;
exports.default = BaseTranslator;
