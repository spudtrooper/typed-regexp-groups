import BaseTranslator, { BaseTranslatorOptions, } from "../base-translator";

export interface Email {
  name: string;
  domain: string;
}

class EmailTranslator extends BaseTranslator<Email> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  regexp(): string {
    const { name: name } = this;
    return `(?<${this.capName("name")}>[A-Za-z0-9._%+-]+)@(?<${this.capName("domain")}>[A-Za-z0-9.-]+\.[A-Za-z]{2,})`;
  }

  create(matched: RegExpExecArray): Email {
    const name = this.fromAsString(matched, "name"),
      domain = this.fromAsString(matched, "domain");
    return { name, domain };
  }
}

export default EmailTranslator;