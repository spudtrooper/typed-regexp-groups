"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("./date");
var email_1 = require("./email");
var ipv4_1 = require("./ipv4");
var url_1 = require("./url");
var all = {
    DateTranslator: date_1.default,
    EmailTranslator: email_1.default,
    Ipv4Translator: ipv4_1.default,
    UrlTranslator: url_1.default
};
exports.default = all;
