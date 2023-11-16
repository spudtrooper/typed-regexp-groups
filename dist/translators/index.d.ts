import DateTranslator from "./date";
import EmailTranslator from "./email";
import Ipv4Translator from "./ipv4";
import UrlTranslator from "./url";
declare const all: {
    DateTranslator: typeof DateTranslator;
    EmailTranslator: typeof EmailTranslator;
    Ipv4Translator: typeof Ipv4Translator;
    UrlTranslator: typeof UrlTranslator;
};
export default all;
