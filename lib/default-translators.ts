import { TranslatorCtor } from "./translate";

import all from "./translators";

const ipv4 = all.Ipv4Translator,
  date = all.DateTranslator,
  email = all.EmailTranslator,
  url = all.UrlTranslator,
  phone = all.PhoneNumberTranslator,
  localtime = all.LocalTimeTranslator
  ;

const translatorCtors: { [key: string]: TranslatorCtor } = {
  ipv4,
  ip: ipv4,
  date,
  email,
  url,
  phone,
  localtime,
}

export default translatorCtors;