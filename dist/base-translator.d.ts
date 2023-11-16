import { Translator } from "./translate";
export interface BaseTranslatorOptions {
    verbose?: boolean;
}
export type Enum = {
    [key: string]: string;
};
declare class BaseTranslator<T, E> implements Translator<T> {
    name: string;
    private _verbose;
    private enum;
    constructor(name: string, inEnum: Enum, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): T;
    _coerce: (v: any) => string | number | boolean;
    protected groupMap: (matched: RegExpExecArray, name: string) => T;
    protected from: (matched: RegExpExecArray, name: string) => string | undefined;
    protected fromAsString: (matched: RegExpExecArray, name: string) => string | undefined;
    protected fromAsInt: (matched: RegExpExecArray, name: string) => number;
    protected entireMatch: (matched: RegExpExecArray) => string;
    get verbose(): boolean;
}
export default BaseTranslator;
