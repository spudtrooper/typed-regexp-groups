import BaseTranslator, { BaseTranslatorOptions, DerivedNumber } from "../base-translator";
export interface Duration {
    millis: DerivedNumber;
}
declare class DurationTranslator extends BaseTranslator<Duration> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): Duration;
}
export default DurationTranslator;
