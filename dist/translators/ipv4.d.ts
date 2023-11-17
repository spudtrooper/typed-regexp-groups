import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";
interface IPv4 {
    octects: number[];
}
declare class IPv4Translator extends BaseTranslator<IPv4> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): IPv4;
}
export default IPv4Translator;
