import { TranslatorCtor } from "./translate";

import all from "./translators";

const ipv4 = all.Ipv4Translator,
  date = all.DateTranslator,
  email = all.EmailTranslator,
  url = all.UrlTranslator,
  phone = all.PhoneNumberTranslator;

const translatorCtors: { [key: string]: TranslatorCtor } = {
  ipv4,
  ip: ipv4,
  date,
  email,
  url,
  phone,
}

export default translatorCtors;