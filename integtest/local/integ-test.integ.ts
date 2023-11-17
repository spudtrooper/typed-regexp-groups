import TypedRegExp from "typed-regexp-groups";

describe('Integration Test', () => {
  it("mixed", () => {
    const
      input = /***/ "The date is: 11/16/2023, your email is jane@bob.com, and the url is http://www.foo.com:81/bar",
      patrn = /**/ "The date is: (?<d:date>), your email is (?<e:email>), and the url is (?<u:url>)",
      re = new TypedRegExp(patrn),
      res = re.exec(input),
      wantDate = new Date(Date.parse("11/16/2023")),
      wantUrl = new URL("http://www.foo.com:81/bar"),
      wantEmail = { name: "jane", domain: "bob.com" };

    expect(res![0]).toEqual(input);
    expect(res![1]).toEqual(wantDate);
    expect(res![2]).toEqual(wantEmail);
    expect(res![3]).toEqual(wantUrl);
    expect(res!.groups.d).toEqual(wantDate);
    expect(res!.groups.e).toEqual(wantEmail);
    expect(res!.groups.u).toEqual(wantUrl);

    expect(re.test(input)).toEqual(true);
    expect(re.test("blah")).toEqual(false);
  });
});