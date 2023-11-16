import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";

class DateTranslator extends BaseTranslator<Date> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  regexp(): string {
    const { name } = this;
    // TODO: This sucks
    return [
      // 01 Jan 1970 00:00:00 GMT
      `\\d{1,2} [A-Z][a-z]{2} \\d{4} \\d{2}:\\d{2}:\\d{2} [A-Z]{3}`,
      // 2023-01-02
      `\\d{4}-\\d{2}-\\d{2}`,
      // 2023/01/02
      `\\d{4}/\\d{2}/\\d{2}`,
      // 01-02-2023
      `\\d{2}-\\d{2}-\\d{4}`,
      // 01/02/2023
      `\\d{2}/\\d{2}/\\d{4}`,
    ].join("|");
  }

  create(matched: RegExpExecArray): Date {
    const { name } = this;
    const match = matched.groups?.[name];
    return new Date(Date.parse(match));
  }
}

export default DateTranslator;