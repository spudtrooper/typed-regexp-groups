import DateTranslator from "./date";
import EmailTranslator from "./email";
import Ipv4Translator from "./ipv4";
import PhoneNumberTranslator from "./phone-number";
import UrlTranslator from "./url";
declare const all: {
    DateTranslator: typeof DateTranslator;
    EmailTranslator: typeof EmailTranslator;
    Ipv4Translator: typeof Ipv4Translator;
    PhoneNumberTranslator: typeof PhoneNumberTranslator;
    UrlTranslator: typeof UrlTranslator;
};
export default all;
