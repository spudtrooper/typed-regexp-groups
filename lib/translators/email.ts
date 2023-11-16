import BaseTranslator, { BaseTranslatorOptions, KeysOfEnum, Enum } from "../base-translator";

import { EmailEnum, Email, emailEnum } from "./email-enum";

class EmailTranslator extends BaseTranslator<Email, EmailEnum> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, emailEnum, opts);
  }

  regexp(): string {
    const { name } = this;
    return `(?<${name}_name>[A-Za-z0-9._%+-]+)@(?<${name}_domain>[A-Za-z0-9.-]+\.[A-Za-z]{2,})`;
  }

  create(matched: RegExpExecArray): Email {
    const { name, domain } = this.groupMap(matched, this.name);
    return { name, domain };
  }
}

export default EmailTranslator;