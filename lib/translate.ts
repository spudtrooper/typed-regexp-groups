export interface Translator {
  readonly name: string
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
  translatedPattern: string,
  translatorsByName: { [key: string]: Translator },
}

export class UnknownTypeError implements Error {
  message: string;
  name: string;
  constructor(type: string) {
    this.message = `Unknown type: ${type}`;
    this.name = "UnknownTypeError";
  }
}

const translatePattern = (pattern: string, registry: TranslatorRegistry): TranslatePatternResult => {
  // Find each string like `(?<addr:ip>)` and replace the `ip` 
  // with the regexp for that translator.
  let translatedPattern = pattern;
  const translatorsByName: { [key: string]: Translator } = {};
  for (let re = /\(\?<(?<name>\w+):(?<type>\w+)>\)/g, m: RegExpExecArray | null;
    (m = re.exec(pattern)) !== null;) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }
    const { name, type } = m.groups;

    const translatorCtor = registry.find(type);
    if (!translatorCtor) {
      throw new UnknownTypeError(type);
    }

    const translator = new translatorCtor(name);
    const translatedRegexp = translator.pattern(),
      translated = `(?<${name}>${translatedRegexp})`,
      needle = `(?<${name}:${type}>)`;
    translatedPattern = translatedPattern.replace(needle, translated);
    if (translator.verbose) {
      console.log("translatedPattern", translatedPattern);
    }
    translatorsByName[name] = translator;
  }

  return { translatedPattern, translatorsByName };
};

export default translatePattern;