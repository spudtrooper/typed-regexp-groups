"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("./date");
var duration_1 = require("./duration");
var email_1 = require("./email");
var ipv4_1 = require("./ipv4");
var local_time_1 = require("./local-time");
var phone_number_1 = require("./phone-number");
var url_1 = require("./url");
var all = {
    DateTranslator: date_1.default,
    DurationTranslator: duration_1.default,
    EmailTranslator: email_1.default,
    Ipv4Translator: ipv4_1.default,
    LocalTimeTranslator: local_time_1.default,
    PhoneNumberTranslator: phone_number_1.default,
    UrlTranslator: url_1.default
};
exports.default = all;
