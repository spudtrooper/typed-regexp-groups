import BaseTranslator, { BaseTranslatorOptions } from "../base-translator-legacy";

interface IPv4 { octects: number[] };

class IPv4Translator extends BaseTranslator<IPv4> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  regexp(): string {
    const { name } = this;
    return `(?<${name}_octect_0>\\d{1,3})\\.(?<${name}_octect_1>\\d{1,3})\\.(?<${name}_octect_2>\\d{1,3})\\.(?<${name}_octect_3>\\d{1,3})`;
  }

  create(matched: RegExpExecArray): IPv4 {
    const octects = [
      this.fromAsString(matched, "octect_0"),
      this.fromAsString(matched, "octect_1"),
      this.fromAsString(matched, "octect_2"),
      this.fromAsString(matched, "octect_3"),
    ].map((v) => parseInt(v));
    return { octects };
  }
}

export default IPv4Translator;