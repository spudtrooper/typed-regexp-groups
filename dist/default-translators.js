"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var translators_1 = require("./translators");
var ipv4 = translators_1.default.Ipv4Translator, date = translators_1.default.DateTranslator, email = translators_1.default.EmailTranslator, url = translators_1.default.UrlTranslator, phone = translators_1.default.PhoneNumberTranslator, localtime = translators_1.default.LocalTimeTranslator;
var translatorCtors = {
    ipv4: ipv4,
    ip: ipv4,
    date: date,
    email: email,
    url: url,
    phone: phone,
    localtime: localtime,
};
exports.default = translatorCtors;
