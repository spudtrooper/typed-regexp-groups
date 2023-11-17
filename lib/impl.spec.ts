import TypedRegExp from "./impl";
import { PhoneNumber } from "./translators/phone-number";

describe('TypedRegExp', () => {
  const phones: { phone: string, want: PhoneNumber }[] = [
    {
      phone: "4561231",
      want: {
        number: "4561231",
        internationalCode: undefined,
        areaCode: undefined,
      }
    },
    {
      phone: "(123) 456-1231",
      want: {
        number: "456-1231",
        internationalCode: undefined,
        areaCode: "123",
      }
    },
    {
      phone: "+1 (123) 456-1231",
      want: {
        number: "456-1231",
        internationalCode: "1",
        areaCode: "123",
      }
    },
    {
      phone: "+1 456-1231",
      want: {
        number: "456-1231",
        internationalCode: "1",
        areaCode: undefined,
      }
    },
  ];
  phones.forEach((test) => {
    const { phone, want } = test;
    const input = `phone ${phone}`;

    it(input, () => {
      const pattern = "phone (?<p:phone>)",
        re = new TypedRegExp(pattern),
        res = re.exec(input);

      expect(res![0]).toEqual(input);
      expect(res![1]).toEqual(want);
      expect(res!.groups.p).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);
    });
  });

  const ipv4s = [
    "12.23.34.45",
  ];
  ipv4s.forEach((ipv4) => {
    const input = `ipv4 ${ipv4}`;

    it(input, () => {
      const pattern = "ipv4 (?<addr:ip>)",
        re = new TypedRegExp(pattern),
        res = re.exec(input),
        want = { octects: [12, 23, 34, 45] };

      expect(res![0]).toEqual(input);
      expect(res![1]).toEqual(want);
      expect(res!.groups.addr).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);
    });
  });

  type URLTestChecks = { [key: string]: any };
  type URLTest = {
    url: string;
    checks: URLTestChecks;
  } | string;
  const defaultChecks = {
    protocol: "http:",
    host: "www.foo.com",
    hostname: "www.foo.com",
    pathname: "/",
    port: "",
  }
  const urlTests: URLTest[] = [
    {
      url: "http://www.foo.com",
      checks: defaultChecks,
    },
    {
      url: "http://www.foo.com",
      checks: defaultChecks,
    },
    {
      url: "http://www.foo.com/",
      checks: defaultChecks,
    },
    {
      url: "https://www.foo.com",
      checks: {
        ...defaultChecks,
        protocol: "https:",
      },
    },
    {
      url: "http://www.foo.com/bar",
      checks: {
        ...defaultChecks,
        pathname: "/bar",
      },
    },
    {
      url: "http://www.foo.com:80",
      checks: {
        ...defaultChecks,
        port: "", // should be empty
      },
    },
    {
      url: "http://www.foo.com:81",
      checks: {
        ...defaultChecks,
        host: "www.foo.com:81",
        port: "81",
      },
    },
    {
      url: "http://www.foo.com:81/",
      checks: {
        ...defaultChecks,
        host: "www.foo.com:81",
        port: "81",
      },
    },
    {
      url: "http://www.foo.com:81/bar",
      checks: {
        ...defaultChecks,
        host: "www.foo.com:81",
        port: "81",
        pathname: "/bar",
      },
    },
    {
      url: "http://localhost",
      checks: {
        ...defaultChecks,
        host: "localhost",
        hostname: "localhost",
      },
    },
    {
      url: "http://localhost/",
      checks: {
        ...defaultChecks,
        host: "localhost",
        hostname: "localhost",
      },
    },
    {
      url: "http://localhost:80",
      checks: {
        ...defaultChecks,
        host: "localhost",
        hostname: "localhost",
        port: "", // should be empty
      },
    },
    {
      url: "http://localhost:80/",
      checks: {
        ...defaultChecks,
        host: "localhost",
        hostname: "localhost",
        port: "", // should be empty
      },
    },
    {
      url: "http://localhost:81/",
      checks: {
        ...defaultChecks,
        host: "localhost:81",
        hostname: "localhost",
        port: "81",
      },
    },
    {
      url: "http://localhost:81/foo",
      checks: {
        ...defaultChecks,
        host: "localhost:81",
        hostname: "localhost",
        port: "81",
        pathname: "/foo",
      },
    },
  ];
  urlTests.forEach((test) => {
    if (typeof test === "string") {
      test = {
        url: test,
        checks: {},
      };
    }
    const { url, checks } = test;

    const input = `url ${url}`;

    it(input, () => {
      const pattern = "url (?<u:url>)",
        re = new TypedRegExp(pattern),
        res = re.exec(input),
        want = new URL(url as string);

      expect(res![0]).toEqual(input);
      expect(res![1]).toEqual(want);
      expect(res!.groups.u).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);

      const have = res!.groups.u;
      Object.entries(checks).forEach(([name, value]) => {
        expect(have[name]).toEqual(value);
      });
    });
  });

  const dates = [
    "01 Jan 1970 00:00:00 GMT",
    "2023-01-02",
    "2023/01/02",
    "01-02-2023",
    "01/02/2023",
  ]
  dates.forEach((date) => {
    const input = `date ${date}`;

    it(input, () => {
      const pattern = "date (?<d:date>)",
        re = new TypedRegExp(pattern),
        res = re.exec(input),
        want = new Date(Date.parse(date));

      expect(res![0]).toEqual(input);
      expect(res![1]).toEqual(want);
      expect(res!.groups.d).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);
    });
  });

  const emails = [
    { name: "alice", domain: "example.com" },
    { name: "alice", domain: "sub.example.com" },
    { name: "foo-bar", domain: "sub.example.com" },
  ]
  emails.forEach((email) => {
    const input = `email ${email.name}@${email.domain}`;

    it(input, () => {
      const pattern = "email (?<e:email>)",
        re = new TypedRegExp(pattern),
        res = re.exec(input),
        want = email;

      expect(res![0]).toEqual(input);
      expect(res![1]).toEqual(want);
      expect(res!.groups.e).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);
    });
  });

  it("mixed", () => {
    const
      input = /***/ "The date is: 11/16/2023, your email is jane@bob.com, and the url is http://www.foo.com:81/bar",
      patrn = /**/  "The date is: (?<d:date>), your email is (?<e:email>), and the url is (?<u:url>)",
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