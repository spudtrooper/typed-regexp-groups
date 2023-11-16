import { TranslatorRegistry, UnknownTypeError } from "./translate";
import { registerTranslator } from "./registry";
import BaseTranslator, { BaseTranslatorOptions } from "./base-translator";
import TypedRegExp, { AnyRegExpExecArray } from "./impl";

interface Pair {
  left: number,
  right: number,
}

class PairTranslator extends BaseTranslator<Pair> {
  constructor(name: string) {
    super(name);
  }

  regexp(): string {
    const { name } = this;
    return `\\{(?<${name}_left>\\d+),(?<${name}_right>\\d+)\\}`;
  }

  create(matched: RegExpExecArray): Pair {
    const [left, right] = matched.slice(2).map((v) => parseInt(v));
    return { left, right };
  }
}

describe('TranslatorRegistry', () => {
  it("no translator", () => {
    const regexp = "pair (?<p:pair>)";

    expect(() => new TypedRegExp(regexp)).toThrow(UnknownTypeError);
  });

  it("registerTranslator", () => {
    registerTranslator("pair", PairTranslator);

    const pattern = "pair (?<p:pair>)",
      input = "pair {1,2}",
      re = new TypedRegExp(pattern),
      res = re.exec(input),
      want = { left: 1, right: 2 };

    expect(res![0]).toEqual(input);
    expect(res![1]).toEqual(want);
    expect(res!.groups.p).toEqual(want);

    expect(re.test(input)).toEqual(true);
    expect(re.test("blah")).toEqual(false);
  });
});