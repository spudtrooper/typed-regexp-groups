import DateTranslator from "./date";
import DurationTranslator from "./duration";
import EmailTranslator from "./email";
import Ipv4Translator from "./ipv4";
import LocalTimeTranslator from "./local-time";
import PhoneNumberTranslator from "./phone-number";
import UrlTranslator from "./url";
declare const all: {
    DateTranslator: typeof DateTranslator;
    DurationTranslator: typeof DurationTranslator;
    EmailTranslator: typeof EmailTranslator;
    Ipv4Translator: typeof Ipv4Translator;
    LocalTimeTranslator: typeof LocalTimeTranslator;
    PhoneNumberTranslator: typeof PhoneNumberTranslator;
    UrlTranslator: typeof UrlTranslator;
};
export default all;
