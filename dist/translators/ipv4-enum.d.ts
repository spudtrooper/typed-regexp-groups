import { Enum } from "../base-translator";
export declare enum Ipv4Enum {
    OCTECT_0 = "octect_0",
    OCTECT_1 = "octect_1",
    OCTECT_2 = "octect_2",
    OCTECT_3 = "octect_3"
}
export interface Ipv4 {
    [Ipv4Enum.OCTECT_0]: number;
    [Ipv4Enum.OCTECT_1]: number;
    [Ipv4Enum.OCTECT_2]: number;
    [Ipv4Enum.OCTECT_3]: number;
}
export declare const ipv4Enum: Enum;
