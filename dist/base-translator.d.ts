import { Translator } from "./translate";
export interface BaseTranslatorOptions {
    verbose?: boolean;
}
declare class BaseTranslator<T> implements Translator {
    name: string;
    private _verbose;
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): T;
    protected from: (matched: RegExpExecArray, name: string) => string | undefined;
    protected fromAsString: (matched: RegExpExecArray, name: string) => string | undefined;
    protected fromAsInt: (matched: RegExpExecArray, name: string) => number;
    protected entireMatch: (matched: RegExpExecArray) => string;
    get verbose(): boolean;
}
export default BaseTranslator;
