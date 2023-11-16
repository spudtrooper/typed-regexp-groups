"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.exec = void 0;
var translate_1 = require("./translate");
var registry_1 = require("./registry");
var createRE = function (pattern, flags, registry) {
    if (!registry) {
        registry = registry_1.default;
    }
    var _a = (0, translate_1.default)(pattern, registry), translatedPattern = _a.translatedPattern, translatorsByName = _a.translatorsByName;
    var re = new RegExp(translatedPattern, flags);
    return { re: re, translatorsByName: translatorsByName };
};
var TypedRegExpImpl = /** @class */ (function () {
    function TypedRegExpImpl(pattern, flags, registry) {
        var _this = this;
        this.pattern = "";
        this._createRE = function (flags) {
            return createRE(_this.pattern, flags, _this.registry);
        };
        this.registry = registry;
        this.compile(pattern, flags);
    }
    TypedRegExpImpl.prototype.exec = function (string) {
        var m = this.re.exec(string);
        return this._runGroups(m, string);
    };
    TypedRegExpImpl.prototype.test = function (string) {
        return this.re.test(string);
    };
    Object.defineProperty(TypedRegExpImpl.prototype, "source", {
        get: function () { return this.source; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "global", {
        get: function () { return this.global; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "ignoreCase", {
        get: function () { return this.ignoreCase; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "multiline", {
        get: function () { return this.multiline; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "flags", {
        get: function () { return this.flags; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "sticky", {
        get: function () { return this.sticky; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "unicode", {
        get: function () { return this.unicode; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "dotAll", {
        get: function () { return this.dotAll; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TypedRegExpImpl.prototype, "lastIndex", {
        get: function () { return this.lastIndex; },
        enumerable: false,
        configurable: true
    });
    TypedRegExpImpl.prototype.compile = function (pattern, flags) {
        this.pattern = pattern;
        var _a = this._createRE(flags), re = _a.re, translatorsByName = _a.translatorsByName;
        this.re = re;
        this.translatorsByName = translatorsByName;
        return this;
    };
    TypedRegExpImpl.prototype.regExp = function (flags) {
        var re = this._createRE(flags).re;
        return re;
    };
    ;
    TypedRegExpImpl.prototype._runGroups = function (m, input) {
        var _this = this;
        if (!m)
            return null;
        // Create a map from group name to translated values
        var groups = Object.fromEntries(Object.keys(m.groups).map(function (groupName) {
            var translator = _this.translatorsByName[groupName];
            if (!translator) {
                // Ignore the generated groups.
                // TODO: Check that they're generated
                return;
            }
            try {
                var translated = translator.create(m);
                return [groupName, translated];
            }
            catch (e) {
                try {
                    console.error("error calling create with translator", translator, "and match", m, "with translator.regexp", translator.regexp());
                }
                catch (ignore) {
                    console.log("ignoring error printing messages after calling create", e);
                }
                throw e;
            }
        }).filter(Boolean));
        var translateIndices = Object.keys(m.groups).map(function (groupName) { return groups[groupName]; }).filter(Boolean);
        var res = [m[0]];
        for (var _i = 0, translateIndices_1 = translateIndices; _i < translateIndices_1.length; _i++) {
            var v = translateIndices_1[_i];
            res.push(v);
        }
        res.groups = groups;
        return res;
    };
    ;
    return TypedRegExpImpl;
}());
var exec = function (input, pattern, flags, registry) {
    var re = new TypedRegExpImpl(pattern, flags, registry);
    var res = re.exec(input);
    return res;
};
exports.exec = exec;
var compile = function (pattern, flags, registry) {
    var re = new TypedRegExpImpl("", undefined, registry);
    return re.compile(pattern, flags);
};
exports.compile = compile;
var ctor = TypedRegExpImpl;
exports.default = ctor;
