"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownTypeError = void 0;
var UnknownTypeError = /** @class */ (function () {
    function UnknownTypeError(type) {
        this.message = "Unknown type: ".concat(type);
        this.name = "UnknownTypeError";
    }
    return UnknownTypeError;
}());
exports.UnknownTypeError = UnknownTypeError;
var translatePattern = function (pattern, registry) {
    // Find each string like `(?<addr:ip>)` and replace the `ip` 
    // with the regexp for that translator.
    var translatedPattern = pattern;
    var translatorsByName = {};
    for (var re = /\(\?<(?<name>\w+):(?<type>\w+)>\)/g, m = void 0; (m = re.exec(pattern)) !== null;) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        var _a = m.groups, name_1 = _a.name, type = _a.type;
        var translatorCtor = registry.find(type);
        if (!translatorCtor) {
            throw new UnknownTypeError(type);
        }
        var translator = new translatorCtor(name_1);
        var translatedRegexp = translator.regexp(), translated = "(?<".concat(name_1, ">").concat(translatedRegexp, ")"), needle = "(?<".concat(name_1, ":").concat(type, ">)");
        translatedPattern = translatedPattern.replace(needle, translated);
        if (translator.verbose) {
            console.log("translatedPattern", translatedPattern);
        }
        translatorsByName[name_1] = translator;
    }
    return { translatedPattern: translatedPattern, translatorsByName: translatorsByName };
};
exports.default = translatePattern;
