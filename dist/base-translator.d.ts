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
declare class BaseTranslator<T> implements Translator {
    readonly name: string;
    readonly verbose: boolean;
    private static nextId;
    private id;
    constructor(name: string, opts?: BaseTranslatorOptions);
    regexp(): string;
    create(matched: RegExpExecArray): T;
    protected capName: (rest?: string) => string;
    protected from: (matched: RegExpExecArray, name: string) => string | undefined;
    protected fromAsString: (matched: RegExpExecArray, name: string) => string | undefined;
    protected fromAsInt: (matched: RegExpExecArray, name: string) => number;
    protected entireMatch: (matched: RegExpExecArray) => string;
}
export default BaseTranslator;
