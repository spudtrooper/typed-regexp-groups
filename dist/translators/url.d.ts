import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";
declare class URLTranslator extends BaseTranslator<URL> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    pattern(): string;
    create(matched: RegExpExecArray): URL;
}
export default URLTranslator;
