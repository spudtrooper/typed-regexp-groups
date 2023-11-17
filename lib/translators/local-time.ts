import BaseTranslator, { BaseTranslatorOptions, DerivedNumber, DerivedBoolean } from "../base-translator";

export interface LocalTime {
  hours: DerivedNumber;
  mins: DerivedNumber;
  secs?: DerivedNumber;
  millis?: DerivedNumber;
  isAm?: DerivedBoolean;
}

class LocalTimeTranslator extends BaseTranslator<LocalTime> {
  constructor(name: string, opts?: BaseTranslatorOptions) {
    super(name, opts);
  }

  pattern(): string {
    return "" +
      `(?<${this.capName("hours")}>(?:00|0?[1-9]|1[0-9]|2[0-3]))` +
      `\\s*[:\\.]\\s*` +
      `(?<${this.capName("mins")}>\\d{2})` +
      `(?:\\s*[:\\.]\\s*(?<${this.capName("secs")}>\\d{2}))?` +
      `(?:\\s*[:\\.]\\s*(?<${this.capName("millis")}>\\d{1,3}))?` +
      `(?:\\s*(?<${this.capName("amPm")}>(?:am|AM|a|A|pm|PM|p|P)))?`;
  }

  create(matched: RegExpExecArray): LocalTime {
    const hoursRaw = this.fromAsString(matched, "hours"),
      hoursVal = parseInt(hoursRaw),
      hours = { raw: hoursRaw, val: hoursVal };

    const minsRaw = this.fromAsString(matched, "mins"),
      minsVal = parseInt(minsRaw),
      mins = { raw: minsRaw, val: minsVal };

    let secs: DerivedNumber | undefined;
    const secsRaw = this.from(matched, "secs");
    if (secsRaw) {
      const val = parseInt(secsRaw);
      secs = { raw: secsRaw, val };
    }

    let millis: DerivedNumber | undefined;
    const millisRaw = this.from(matched, "millis");
    if (millisRaw) {
      const val = parseInt(millisRaw);
      millis = { raw: millisRaw, val };
    }
    let isAm: DerivedBoolean | undefined;
    const amPm = this.from(matched, "amPm");
    if (amPm) {
      const val = amPm.toLowerCase().startsWith("a");
      isAm = { raw: amPm, val };
      if (!val) {
        hours.val += 12;
      }
    }

    return { hours, mins, secs, millis, isAm };
  }
}

export default LocalTimeTranslator;