import { TranslatorCtor, TranslatorRegistry, UnknownTypeError } from "./translate";
import defaultTranslators from "./default-translators";

class TranslatorRegistryImpl implements TranslatorRegistry {
  constructor(private translatorCtors: { [key: string]: TranslatorCtor }) { }

  find(type: string): TranslatorCtor {
    const translatorCtor = this.translatorCtors[type.toLowerCase()];
    if (!translatorCtor) {
      throw new UnknownTypeError(type);
    }
    return translatorCtor;
  }

  register(type: string, translatorCtor: TranslatorCtor): void {
    if (type.toLowerCase() in this.translatorCtors) {
      throw new Error(
        `TranslatorCtor already registered for type: ${type}. ` +
        `Call unregister("${type}") first`
      );
    }
    this.translatorCtors[type.toLowerCase()] = translatorCtor;
  }

  unregister(type: string): boolean {
    const res = type.toLowerCase() in this.translatorCtors;
    delete this.translatorCtors[type.toLowerCase()];
    return res;
  }
}

export const globalTranslatorRegistry =
  new TranslatorRegistryImpl(defaultTranslators);

export const registerTranslator = (type: string, translatorCtor: TranslatorCtor): void =>
  globalTranslatorRegistry.register(type, translatorCtor);

export default globalTranslatorRegistry;

