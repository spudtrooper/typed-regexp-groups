import { TranslatorCtor, TranslatorRegistry } from "./translate";
declare class TranslatorRegistryImpl implements TranslatorRegistry {
    private translatorCtors;
    constructor(translatorCtors: {
        [key: string]: TranslatorCtor;
    });
    find(type: string): TranslatorCtor;
    register(type: string, translatorCtor: TranslatorCtor): void;
    unregister(type: string): boolean;
}
export declare const globalTranslatorRegistry: TranslatorRegistryImpl;
export declare const registerTranslator: (type: string, translatorCtor: TranslatorCtor) => void;
export default globalTranslatorRegistry;
