import { TranslatorRegistry } from "./translate";
export interface AnyRegExpExecArray extends Array<any>, Iterator<any> {
    groups: {
        [key: string]: any;
    };
    input: string;
    regexp: RegExp;
}
export interface TypedRegExp {
    /**
     * Executes a search on a string using a regular expression pattern, and returns an array containing the results of that search.
     * @param string The String object or string literal on which to perform the search.
     */
    exec(string: string): AnyRegExpExecArray | null;
    /**
     * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
     * @param string String on which to perform the search.
     */
    test(string: string): boolean;
    /** Returns a copy of the text of the regular expression pattern. Read-only. The regExp argument is a Regular expression object. It can be a variable name or a literal. */
    readonly source: string;
    /** Returns a Boolean value indicating the state of the global flag (g) used with a regular expression. Default is false. Read-only. */
    readonly global: boolean;
    /** Returns a Boolean value indicating the state of the ignoreCase flag (i) used with a regular expression. Default is false. Read-only. */
    readonly ignoreCase: boolean;
    /** Returns a Boolean value indicating the state of the multiline flag (m) used with a regular expression. Default is false. Read-only. */
    readonly multiline: boolean;
    /** Returns the underlying RegExp. */
    regExp(flags?: string | undefined): RegExp;
    lastIndex: number;
    /** @deprecated A legacy feature for browser compatibility */
    compile(pattern: string, flags?: string): this;
}
export declare const exec: (input: string, pattern: string, flags?: string | undefined, registry?: TranslatorRegistry | null) => AnyRegExpExecArray | null;
export declare const compile: (pattern: string, flags?: string | undefined, registry?: TranslatorRegistry | null) => TypedRegExp;
export type TypedRegExpConstructor = new (pattern: string, flags?: string | undefined) => TypedRegExp;
declare const ctor: TypedRegExpConstructor;
export default ctor;
