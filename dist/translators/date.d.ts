import BaseTranslator, { BaseTranslatorOptions } from "../base-translator-legacy";
declare class DateTranslator extends BaseTranslator<Date> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): Date;
}
export default DateTranslator;
