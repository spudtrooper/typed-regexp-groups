import { Translator } from "./translate";

export interface BaseTranslatorOptions {
  verbose?: boolean;
}

export type Enum = { [key: string]: string };

class BaseTranslator<T, E> implements Translator<T> {
  name: string;
  private _verbose: boolean;
  private enum: Enum;

  constructor(name: string, inEnum: Enum, opts: BaseTranslatorOptions = {}) {
    const { verbose } = opts;

    this.name = name;
    this._verbose = !!verbose;
    this.enum = inEnum;
  }
  regexp(): string {
    throw new Error("Method not implemented.");
  }
  create(matched: RegExpExecArray): T {
    throw new Error("Method not implemented.");
  }

  _coerce = (v: any): string | number | boolean => {
    return "";
  }

  protected groupMap = (matched: RegExpExecArray, name: string): T => {
    return Object.fromEntries(Object.values(this.enum).map((enumValue: string) => {
      const name = enumValue.toLowerCase();
      const value = matched.groups?.[`${this.name}_${name}`];
      return [enumValue, value];
    })) as T;
  };

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