import BaseTranslator, { BaseTranslatorOptions } from "../base-translator-legacy";
export interface Email {
    name: string;
    domain: string;
}
declare class EmailTranslator extends BaseTranslator<Email> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): Email;
}
export default EmailTranslator;
