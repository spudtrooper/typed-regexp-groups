import BaseTranslator, { BaseTranslatorOptions } from "../base-translator";

class URLTranslator extends BaseTranslator<URL> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  pattern(): string {
    // https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
    return '' +
    // protocol
    /**/ 'https?:\/\/' +

    // domain name
    /**/ '(?:' +
    /**/   '(?:' +
    /**/     '(?:[a-z\\d]' +
    /**/       '(?:' +
    /**/         '[a-z\\d-]*[a-z\\d]' +
    /**/       ')*' +
    /**/    ')\.' +
    /**/   ')+' +
    /**/   '[a-z]{2,}' +

    /**/   '|' + // OR

    // ip (v4) address
    /**/   '(?:' +
    /**/     '(?:' +
    /**/       '\\d{1,3}\.' +
    /**/     '){3}' +
    /**/     '\\d{1,3}' +
    /**/   ')' +

    // end domain name
    /**/ ')' +

    // port
    /**/ '(?:' +
    /**/   '\\:\\d+' +
    /**/ ')?' +

    // path
    /**/ '(?:' +
    /**/   '\/[-a-z\\d%_.~+]*' +
    /**/ ')*' +

    // query string
    /**/ '(?:' +
    /**/   '\\?[;&a-z\\d%_.~+=-]*' +
    /**/ ')?' +

    // fragment locator
    /**/ '(?:' +
    /**/   '\\#[-a-z\\d_]*' +
    /**/ ')?' +

    // end
    /**/ '';
  }


  create(matched: RegExpExecArray): URL {
    const url = this.entireMatch(matched);
    return new URL(url);
  }
}

export default URLTranslator;