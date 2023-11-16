import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";
import { EmailEnum, Email } from "./email-enum";
declare class EmailTranslator extends BaseTranslator<Email, EmailEnum> {
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): Email;
}
export default EmailTranslator;
