import { Enum } from "../base-translator";
export declare enum EmailEnum {
    NAME = "name",
    DOMAIN = "domain"
}
export interface Email {
    [EmailEnum.NAME]: string;
    [EmailEnum.DOMAIN]: string;
}
export declare const emailEnum: Enum;
