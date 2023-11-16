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
    get verbose(): boolean;
}
export default BaseTranslator;
