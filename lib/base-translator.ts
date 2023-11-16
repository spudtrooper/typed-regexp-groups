import { Translator } from "./translate";

export interface BaseTranslatorOptions {
  verbose?: boolean;
}

class BaseTranslator<T> implements Translator {
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

  get verbose(): boolean { return this._verbose; }
};

export default BaseTranslator;