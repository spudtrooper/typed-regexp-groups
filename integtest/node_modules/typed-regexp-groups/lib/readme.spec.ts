import TypedRegExp from "./impl";

describe('Readme', () => {
  const input = "The url is: http://www.foo.com:81/bar";

  const log = (...any) => { };

  it("RegExp", () => {
    const re = new RegExp(
      'The url is: ' +
      '(?<protocol>https?:\\/\\/)?' +
      '(?<domain>(([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(?<port>\\:\\d+)?' +
      '(?<pathname>\\/[-a-z\\d%_.~+]*)*' +
      '(?<query>\\?[;&a-z\\d%_.~+=-]*)?' +
      '(?<fragment>\\#[-a-z\\d_]*)?');

    const res = re.exec(input);

    const host = `${res!.groups?.domain}${res!.groups?.port}`;

    log(`The host is ${host}`);

    expect(host).toEqual("www.foo.com:81");
  });

  it("TypedRegExp", () => {
    const pattern = "The url is: (?<u:url>)",
      res = new TypedRegExp(pattern).exec(input);

    const host = res!.groups?.u.host;

    log(`The host is ${host}`);

    expect(host).toEqual("www.foo.com:81");
  });

  it("date", () => {
    const input = "The date is: 2023/11/16";
    const pattern = "The date is: (?<d:date>)",
      res = new TypedRegExp(pattern).exec(input);

    const year = res!.groups?.d.getYear() + 1900;

    log(`The year is ${year}`);

    expect(year).toEqual(2023);
  });

  it("email", () => {
    const input = "Your email is: sue@bob.johson.enterprises.com";
    const pattern = "Your email is: (?<e:email>)",
      res = new TypedRegExp(pattern).exec(input);

    const domain = res!.groups?.e.domain;

    log(`The domain is ${domain}`);

    expect(domain).toEqual("bob.johson.enterprises.com");
  });
});