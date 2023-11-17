import { Translator } from "./translate";

export interface BaseTranslatorOptions {
  verbose?: boolean;
}

export interface Derived<T extends string | number | boolean> {
  raw: string
  val: T;
}

export type DerivedString = Derived<string>;
export type DerivedNumber = Derived<number>;
export type DerivedBoolean = Derived<boolean>;

class BaseTranslator<T> implements Translator<T> {
  readonly name: string;
  readonly verbose: boolean;

  private static nextId: number = 1;
  private id: number = BaseTranslator.nextId++;

  constructor(name: string, opts: BaseTranslatorOptions = {}) {
    const { verbose } = opts;

    this.name = name;
    this.verbose = !!verbose;
  }
  regexp(): string {
    throw new Error("Method not implemented.");
  }
  create(matched: RegExpExecArray): T {
    throw new Error("Method not implemented.");
  }

  protected capName = (rest?: string): string =>
    rest ? `${this.name}_${this.id}_${rest}` : `${this.name}_${this.id}`;

  protected from = (matched: RegExpExecArray, name: string): string | undefined =>
    matched.groups?.[`${this.name}_${this.id}_${name}`];

  protected fromAsString = (matched: RegExpExecArray, name: string): string | undefined =>
    matched.groups?.[`${this.name}_${this.id}_${name}`] as string;

  protected fromAsInt = (matched: RegExpExecArray, name: string): number =>
    parseInt(this.fromAsString(matched, name));

  protected entireMatch = (matched: RegExpExecArray): string =>
    matched.groups?.[this.name];
};

export default BaseTranslator;