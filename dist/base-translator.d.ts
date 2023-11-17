import { Translator } from "./translate";
export interface BaseTranslatorOptions {
    verbose?: boolean;
}
export interface Derived<T extends string | number | boolean> {
    raw: string;
    val: T;
}
export type DerivedString = Derived<string>;
export type DerivedNumber = Derived<number>;
export type DerivedBoolean = Derived<boolean>;
declare class BaseTranslator<T> implements Translator<T> {
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
