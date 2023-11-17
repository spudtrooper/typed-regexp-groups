import BaseTranslator, { BaseTranslatorOptions, DerivedNumber, DerivedBoolean } from "../base-translator";
export interface LocalTime {
    hours: DerivedNumber;
    mins: DerivedNumber;
    secs?: DerivedNumber;
    millis?: DerivedNumber;
    isAm?: DerivedBoolean;
}
declare class LocalTimeTranslator extends BaseTranslator<LocalTime> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    pattern(): string;
    create(matched: RegExpExecArray): LocalTime;
}
export default LocalTimeTranslator;
