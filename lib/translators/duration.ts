import BaseTranslator, { BaseTranslatorOptions, DerivedNumber } from "../base-translator";
import parseDuration from "parse-duration";

export interface Duration {
  millis: DerivedNumber;
}

class DurationTranslator extends BaseTranslator<Duration> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  pattern(): string {
    const num = `[-]?(\\d+(\\.\\d+)?|\\.\\d+)([eE][+-]?\\d+)?`;
    return "" +
      `(?:${num}(?:years|year|y|yr))?` +
      `\\s*` +
      `(?:${num}(?:months|month))?` +
      `\\s*` +
      `(?:${num}(?:weeks|week|wk|w))?` +
      `\\s*` +
      `(?:${num}(?:days|day|d))?` +
      `\\s*` +
      `(?:${num}(?:hours|hour|hr|h))?` +
      `\\s*` +
      `(?:${num}(?:minutes|minute|min|m))?` +
      `\\s*` +
      `(?:${num}(?:seconds|second|sec|s))?` +
      `\\s*` +
      `(?:${num}(?:millseconds|millsecond|ms))?` +
      `\\s*` +
      `(?:${num}(?:microseconds|microsecond|μs))?` +
      `\\s*` +
      `(?:${num}(?:nanoseconds|nanosecond|ns))?`;
  }

  create(matched: RegExpExecArray): Duration {
    const raw = this.entireMatch(matched),
      val = parseDuration(raw),
      millis = { raw, val };
    return { millis };
  }
}

export default DurationTranslator;