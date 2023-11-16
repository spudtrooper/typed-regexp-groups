import { Translator } from "./translate";

export interface BaseTranslatorOptions {
  verbose?: boolean;
}

class BaseTranslator<T> implements Translator<T> {
  name: string;
  private _verbose: boolean;

  constructor(name: string, opts: BaseTranslatorOptions = {}) {
    const { verbose } = opts;

    this.name = name;
    this._verbose = !!verbose;
  }
  regexp(): string {
    throw new Error("Method not implemented.");
  }
  create(matched: RegExpExecArray): T {
    throw new Error("Method not implemented.");
  }

  protected from = (matched: RegExpExecArray, name: string): string | undefined =>
    matched.groups?.[`${this.name}_${name}`];

  protected fromAsString = (matched: RegExpExecArray, name: string): string | undefined =>
    matched.groups?.[`${this.name}_${name}`] as string;

  protected fromAsInt = (matched: RegExpExecArray, name: string): number =>
    parseInt(this.fromAsString(matched, name));

  protected entireMatch = (matched: RegExpExecArray): string =>
    matched.groups?.[this.name];

  get verbose(): boolean { return this._verbose; }
};

export default BaseTranslator;