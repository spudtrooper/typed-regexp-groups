import BaseTranslator, { BaseTranslatorOptions } from "../base-translator-legacy";
declare class URLTranslator extends BaseTranslator<URL> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): URL;
}
export default URLTranslator;
