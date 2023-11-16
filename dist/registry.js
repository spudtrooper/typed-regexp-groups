"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTranslator = exports.globalTranslatorRegistry = void 0;
var translate_1 = require("./translate");
var default_translators_1 = require("./default-translators");
var TranslatorRegistryImpl = /** @class */ (function () {
    function TranslatorRegistryImpl(translatorCtors) {
        this.translatorCtors = translatorCtors;
    }
    TranslatorRegistryImpl.prototype.find = function (type) {
        var translatorCtor = this.translatorCtors[type.toLowerCase()];
        if (!translatorCtor) {
            throw new translate_1.UnknownTypeError(type);
        }
        return translatorCtor;
    };
    TranslatorRegistryImpl.prototype.register = function (type, translatorCtor) {
        if (type.toLowerCase() in this.translatorCtors) {
            throw new Error("TranslatorCtor already registered for type: ".concat(type, ". ") +
                "Call unregister(\"".concat(type, "\") first"));
        }
        this.translatorCtors[type.toLowerCase()] = translatorCtor;
    };
    TranslatorRegistryImpl.prototype.unregister = function (type) {
        var res = type.toLowerCase() in this.translatorCtors;
        delete this.translatorCtors[type.toLowerCase()];
        return res;
    };
    return TranslatorRegistryImpl;
}());
exports.globalTranslatorRegistry = new TranslatorRegistryImpl(default_translators_1.default);
var registerTranslator = function (type, translatorCtor) {
    return exports.globalTranslatorRegistry.register(type, translatorCtor);
};
exports.registerTranslator = registerTranslator;
exports.default = exports.globalTranslatorRegistry;
