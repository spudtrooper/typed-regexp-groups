import TypedRegExp from "./impl";
import { PhoneNumber } from "./translators/phone-number";
import { LocalTime } from "./translators/local-time";
import { Duration } from "./translators/duration";

describe('TypedRegExp', () => {
  const durationTests: { test: string, want: Duration }[] = [
    {
      test: "1y",
      want: {
        millis: { raw: "1y", val: 31557600000 },
      }
    },
    {
      test: "1y 2months",
      want: {
        millis: { raw: "1y 2months", val: 36817200000 },
      }
    },
    // TODO: more
  ];
  durationTests.forEach((test) => {
    const { test: duration, want } = test;
    const input = `duration ${duration}`;

    it(input, () => {
      const pattern = "duration (?<d:duration>)",
        re = new TypedRegExp(pattern),
        have = re.exec(input);

      expect(have![0]).toEqual(input);
      expect(have![1]).toEqual(want);
      expect(have!.groups.d).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);
    });
  });

  const localTimeTests: { test: string, want: LocalTime }[] = [
    {
      test: "01:23",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
      }
    },
    {
      test: "1:23",
      want: {
        hours: { raw: "1", val: 1 },
        mins: { raw: "23", val: 23 },
      }
    },
    {
      test: "01:23:45",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
      }
    },
    {
      test: "01:23:45.678",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
      }
    },
    {
      test: "01:23:45.678 a",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "a", val: true },
      }
    },
    {
      test: "01:23:45.678  a",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "a", val: true },
      }
    },
    {
      test: "01:23:45.678a",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "a", val: true },
      }
    },
    {
      test: "01:23:45.678 am",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "am", val: true },
      }
    },
    {
      test: "01:23:45.678 p",
      want: {
        hours: { raw: "01", val: 13 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "p", val: false },
      }
    },
    {
      test: "01:23:45.678 pm",
      want: {
        hours: { raw: "01", val: 13 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "pm", val: false },
      }
    },
    {
      test: "01:23:45.678 A",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "A", val: true },
      }
    },
    {
      test: "01:23:45.678 AM",
      want: {
        hours: { raw: "01", val: 1 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "AM", val: true },
      }
    },
    {
      test: "01:23:45.678 P",
      want: {
        hours: { raw: "01", val: 13 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "P", val: false },
      }
    },
    {
      test: "01:23:45.678 PM",
      want: {
        hours: { raw: "01", val: 13 },
        mins: { raw: "23", val: 23 },
        secs: { raw: "45", val: 45 },
        millis: { raw: "678", val: 678 },
        isAm: { raw: "PM", val: false },
      }
    },
  ];
  localTimeTests.forEach((test) => {
    const { test: localTime, want } = test;
    const input = `localTime ${localTime}`;

    it(input, () => {
      const pattern = "localTime (?<t:localtime>)",
        re = new TypedRegExp(pattern),
        have = re.exec(input);

      expect(have![0]).toEqual(input);
      expect(have![1]).toEqual(want);
      expect(have!.groups.t).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);
    });
  });

  const phoneTests: { test: string, want: PhoneNumber }[] = [
    {
      test: "4561231",
      want: {
        number: "4561231",
        internationalCode: undefined,
        areaCode: undefined,
      }
    },
    {
      test: "(123) 456-1231",
      want: {
        number: "456-1231",
        internationalCode: undefined,
        areaCode: "123",
      }
    },
    {
      test: "+1 (123) 456-1231",
      want: {
        number: "456-1231",
        internationalCode: "1",
        areaCode: "123",
      }
    },
    {
      test: "+1 456-1231",
      want: {
        number: "456-1231",
        internationalCode: "1",
        areaCode: undefined,
      }
    },
  ];
  phoneTests.forEach((test) => {
    const { test: phone, want } = test;
    const input = `phone ${phone}`;

    it(input, () => {
      const pattern = "phone (?<p:phone>)",
        re = new TypedRegExp(pattern),
        have = re.exec(input);

      expect(have![0]).toEqual(input);
      expect(have![1]).toEqual(want);
      expect(have!.groups.p).toEqual(want);

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
        have = re.exec(input),
        want = new URL(url as string);

      expect(have![0]).toEqual(input);
      expect(have![1]).toEqual(want);
      expect(have!.groups.u).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);

      const u = have!.groups.u;
      Object.entries(checks).forEach(([name, value]) => {
        expect(u[name]).toEqual(value);
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
        have = re.exec(input),
        want = new Date(Date.parse(date));

      expect(have![0]).toEqual(input);
      expect(have![1]).toEqual(want);
      expect(have!.groups.d).toEqual(want);

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
        have = re.exec(input),
        want = email;

      expect(have![0]).toEqual(input);
      expect(have![1]).toEqual(want);
      expect(have!.groups.e).toEqual(want);

      expect(re.test(input)).toEqual(true);
      expect(re.test("blah")).toEqual(false);
    });
  });

  it("mixed", () => {
    const
      input = /***/ "The date is: 11/16/2023, your email is jane@bob.com, and the url is http://www.foo.com:81/bar",
      patrn = /**/  "The date is: (?<d:date>), your email is (?<e:email>), and the url is (?<u:url>)",
      re = new TypedRegExp(patrn),
      have = re.exec(input),
      wantDate = new Date(Date.parse("11/16/2023")),
      wantUrl = new URL("http://www.foo.com:81/bar"),
      wantEmail = { name: "jane", domain: "bob.com" };

    expect(have![0]).toEqual(input);
    expect(have![1]).toEqual(wantDate);
    expect(have![2]).toEqual(wantEmail);
    expect(have![3]).toEqual(wantUrl);
    expect(have!.groups.d).toEqual(wantDate);
    expect(have!.groups.e).toEqual(wantEmail);
    expect(have!.groups.u).toEqual(wantUrl);

    expect(re.test(input)).toEqual(true);
    expect(re.test("blah")).toEqual(false);
  });

});