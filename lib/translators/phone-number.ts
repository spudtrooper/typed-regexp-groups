import BaseTranslator, { BaseTranslatorOptions, } from "../base-translator";

export interface PhoneNumber {
  number: string;
  internationalCode?: string;
  areaCode?: string;
}

class PhoneNumberTranslator extends BaseTranslator<PhoneNumber> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  regexp(): string {
    const { name: name } = this;
    return "" +
      `(?:\\+(?<${this.capName("intl_code")}>\\d{1,3})\\s+)?` +
      `(?:\\(?(?<${this.capName("area_code")}>\\d{2,5})\\)?\\s+)?` +
      `(?<${this.capName("number")}>(?:[0-9\\-\\(\\)\\/\\.]\\s?){5,15})`;
  }

  create(matched: RegExpExecArray): PhoneNumber {
    const internationalCode = this.fromAsString(matched, "intl_code"),
      areaCode = this.fromAsString(matched, "area_code"),
      number = this.fromAsString(matched, "number");
    return { internationalCode, areaCode, number };
  }
}

export default PhoneNumberTranslator;