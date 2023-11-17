import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";
declare class DateTranslator extends BaseTranslator<Date> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    pattern(): string;
    create(matched: RegExpExecArray): Date;
}
export default DateTranslator;
