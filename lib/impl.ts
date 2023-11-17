import translatePattern, { Translator, TranslatorRegistry } from "./translate";
import globalTranslatorRegistry from "./registry";

export interface AnyRegExpExecArray extends Array<any>, Iterator<any> {
  groups: { [key: string]: any };
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

  // Non-standard extensions
  /** @deprecated A legacy feature for browser compatibility */
  compile(pattern: string, flags?: string): this;
}

const createRE = (pattern: string, flags: string | undefined, registry: TranslatorRegistry | null) => {
  if (!registry) {
    registry = globalTranslatorRegistry;
  }
  const { translatedPattern, translatorsByName } = translatePattern(pattern, registry);
  const re = new RegExp(translatedPattern, flags);
  return { re, translatorsByName };
};

class TypedRegExpImpl implements TypedRegExp {
  private re: RegExp;
  private translatorsByName: { [key: string]: Translator };
  private pattern: string = "";
  private registry: TranslatorRegistry | null;

  constructor(pattern: string, flags?: string | undefined, registry?: TranslatorRegistry | null) {
    this.registry = registry;
    this.compile(pattern, flags);
  }

  exec(string: string): AnyRegExpExecArray | null {
    const m = this.re.exec(string);
    return this._runGroups(m, string);
  }
  test(string: string): boolean {
    return this.re.test(string);
  }

  get source(): string { return this.source; }
  get global(): boolean { return this.global; }
  get ignoreCase(): boolean { return this.ignoreCase; }
  get multiline(): boolean { return this.multiline; }
  get flags(): string { return this.flags; }
  get sticky(): boolean { return this.sticky; }
  get unicode(): boolean { return this.unicode; }
  get dotAll(): boolean { return this.dotAll; }
  get lastIndex(): number { return this.lastIndex; }

  compile(pattern: string, flags?: string | undefined): this {
    this.pattern = pattern;
    const { re, translatorsByName } = this._createRE(flags);
    this.re = re;
    this.translatorsByName = translatorsByName;
    return this;
  }

  regExp(flags?: string | undefined): RegExp {
    const { re } = this._createRE(flags);
    return re;
  };

  _createRE = (flags?: string | undefined) =>
    createRE(this.pattern, flags, this.registry);

  _runGroups(m: RegExpExecArray | null, input: string): AnyRegExpExecArray | null {
    if (!m) return null;

    // Create a map from group name to translated values
    const groups = Object.fromEntries(Object.keys(m.groups).map(groupName => {
      const translator = this.translatorsByName[groupName];
      if (!translator) {
        // Ignore the generated groups.
        // TODO: Check that they're generated
        return;
      }
      try {
        const translated = translator.create(m);
        return [groupName, translated];
      } catch (e) {
        try {
          console.error(
            "error calling create with translator", translator,
            "and match", m,
            "with translator.regexp", translator.regexp());
        } catch (ignore) {
          console.log("ignoring error printing messages after calling create", e);
        }
        throw e;
      }
    }).filter(Boolean));
    const translateIndices = Object.keys(m.groups).map((groupName) => groups[groupName]).filter(Boolean);

    const res = [m[0]] as AnyRegExpExecArray;
    for (const v of translateIndices) {
      res.push(v);
    }
    res.groups = groups;
    return res;
  };
}

export const exec = (input: string, pattern: string, flags?: string | undefined, registry?: TranslatorRegistry | null): AnyRegExpExecArray | null => {
  const re = new TypedRegExpImpl(pattern, flags, registry);
  const res = re.exec(input);
  return res;
};

export const compile = (pattern: string, flags?: string | undefined, registry?: TranslatorRegistry | null): TypedRegExp => {
  const re = new TypedRegExpImpl("", undefined, registry);
  return re.compile(pattern, flags);
};

export type TypedRegExpConstructor =
  new (pattern: string, flags?: string | undefined) => TypedRegExp;

const ctor: TypedRegExpConstructor = TypedRegExpImpl;

export default ctor;