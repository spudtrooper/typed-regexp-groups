import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";

interface Email {
  name: string;
  domain: string;
}

class EmailTranslator extends BaseTranslator<Email> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  regexp(): string {
    const { name } = this;
    return `(?<${name}_name>[A-Za-z0-9._%+-]+)@(?<${name}_domain>[A-Za-z0-9.-]+\.[A-Za-z]{2,})`;
  }

  create(matched: RegExpExecArray): Email {
    const name = matched.groups?.[`${this.name}_name`],
      domain = matched.groups?.[`${this.name}_domain`];
    return { name, domain };
  }
}

export default EmailTranslator;