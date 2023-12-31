export interface Translator {
    readonly name: string;
    readonly verbose: boolean;
    pattern(): string;
    create(matched: RegExpExecArray): any;
}
export interface TranslatorRegistry {
    find(type: string): TranslatorCtor | null;
    register(type: string, translatorCtor: TranslatorCtor): void;
    unregister(type: string): boolean;
}
export type TranslatorCtor = new (typeName: string) => Translator;
interface TranslatePatternResult {
    translatedPattern: string;
    translatorsByName: {
        [key: string]: Translator;
    };
}
export declare class UnknownTypeError implements Error {
    message: string;
    name: string;
    constructor(type: string);
}
declare const translatePattern: (pattern: string, registry: TranslatorRegistry) => TranslatePatternResult;
export default translatePattern;
