import { Enum } from "../base-translator";

/*
  Generated on 2023-11-16T18:16:41.622Z from
  ```
  {
  "name": "ipv4",
  "fields": [
    {
      "name": "octect_0",
      "type": "number"
    },
    {
      "name": "octect_1",
      "type": "number"
    },
    {
      "name": "octect_2",
      "type": "number"
    },
    {
      "name": "octect_3",
      "type": "number"
    }
  ]
}
  ```
 */

export enum Ipv4Enum {
  OCTECT_0 = "octect_0",
  OCTECT_1 = "octect_1",
  OCTECT_2 = "octect_2",
  OCTECT_3 = "octect_3",
}

export interface Ipv4 {
  [Ipv4Enum.OCTECT_0]: number;
  [Ipv4Enum.OCTECT_1]: number;
  [Ipv4Enum.OCTECT_2]: number;
  [Ipv4Enum.OCTECT_3]: number;
}

export const ipv4Enum = {
  [Ipv4Enum.OCTECT_0]: Ipv4Enum.OCTECT_0,
  [Ipv4Enum.OCTECT_1]: Ipv4Enum.OCTECT_1,
  [Ipv4Enum.OCTECT_2]: Ipv4Enum.OCTECT_2,
  [Ipv4Enum.OCTECT_3]: Ipv4Enum.OCTECT_3,
} as Enum;