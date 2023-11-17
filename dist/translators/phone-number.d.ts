import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";
export interface PhoneNumber {
    number: string;
    internationalCode?: string;
    areaCode?: string;
}
declare class PhoneNumberTranslator extends BaseTranslator<PhoneNumber> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): PhoneNumber;
}
export default PhoneNumberTranslator;
