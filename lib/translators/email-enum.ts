import { Enum } from "../base-translator";

/*
  Generated on 2023-11-16T18:16:41.620Z from
  ```
  {
  "name": "email",
  "fields": [
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "domain",
      "type": "string"
    }
  ]
}
  ```
 */

export enum EmailEnum {
  NAME = "name",
  DOMAIN = "domain",
}

export interface Email {
  [EmailEnum.NAME]: string;
  [EmailEnum.DOMAIN]: string;
}

export const emailEnum = {
  [EmailEnum.NAME]: EmailEnum.NAME,
  [EmailEnum.DOMAIN]: EmailEnum.DOMAIN,
} as Enum;