"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseTranslator = /** @class */ (function () {
    function BaseTranslator(name, opts) {
        if (opts === void 0) { opts = {}; }
        var _this = this;
        this.id = BaseTranslator.nextId++;
        this.from = function (matched, name) { var _a; return (_a = matched.groups) === null || _a === void 0 ? void 0 : _a["".concat(_this.name, "_").concat(name)]; };
        this.fromAsString = function (matched, name) { var _a; return (_a = matched.groups) === null || _a === void 0 ? void 0 : _a["".concat(_this.name, "_").concat(name)]; };
        this.fromAsInt = function (matched, name) {
            return parseInt(_this.fromAsString(matched, name));
        };
        this.entireMatch = function (matched) { var _a; return (_a = matched.groups) === null || _a === void 0 ? void 0 : _a[_this.name]; };
        var verbose = opts.verbose;
        this.name = name;
        this.verbose = !!verbose;
    }
    BaseTranslator.prototype.regexp = function () {
        throw new Error("Method not implemented.");
    };
    BaseTranslator.prototype.create = function (matched) {
        throw new Error("Method not implemented.");
    };
    BaseTranslator.nextId = 1;
    return BaseTranslator;
}());
;
exports.default = BaseTranslator;
