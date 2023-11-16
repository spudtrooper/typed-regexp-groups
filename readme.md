# typedregexp

A nodejs library for typing captured groups of regular expressions.

## Motivation

Instead of writing:

```js
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

console.log(`The host is ${host}`); // The host is www.foo.com:81
```

You write:

```js
const regexp = "The url is: (?<u:url>)",
      res = new TypedRegExp(pattern).exec(input);

const host = res!.groups?.u.host;

console.log(`The host is ${host}`); // The host is www.foo.com:81
```

Other built in types:

***email***

```js
const input = "Your email is: sue@bob.johson.enterprises.com";
const pattern = "Your email is: (?<e:email>)",
  res = new TypedRegExp(pattern).exec(input);

const domain = res!.groups?.e.domain;

console.log(`The domain is ${domain}`); // The domain is bob.johson.enterprises.com
```

***date***

```js
const input = "The date is: 2023/11/16";
const pattern = "The date is: (?<d:date>)",
  res = new TypedRegExp(pattern).exec(input);

const year = res!.groups?.d.getYear() + 1900;

console.log(`The year is ${year}`); // The year is 2023
```

## Usage

Use `TypedRegExp` as a drop-in replacement for `RegExp` and use the syntax `(?<name:type>)` to bind the result of matching "name" to an object of type "type" instead of `(?<name>pattern)` to bind the result of matching "pettern" to "name" to whatever is in "pattern".

See the built in types: [here](TOOD).

You can also register new types, see the test [here](TODO).

## Installation

```sh
yarn install typed-regexp-groups
```

## Caveats

No promises. This is probably really, really slow, I haven't profiled it.
