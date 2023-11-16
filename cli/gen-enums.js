import fs from "fs";
import path from "path";
import spec from "../lib/translators/enums-spec.mjs";

const gen = (enumSpec) => {
  const { name, fields } = enumSpec;
  let { nameCaps } = enumSpec;
  if (!nameCaps) {
    nameCaps = name.charAt(0).toUpperCase() + name.slice(1);
  }
  const enumName = `${nameCaps}Enum`;
  const fieldNamesLower = fields.map(({ name }) => name.toLowerCase());
  const fieldNamesUpper = fields.map(({ name, type }) => ({
    caps: name.toUpperCase(),
    lower: name.toLowerCase(),
    type,
  }));

  return `
import { Enum } from "../base-translator";

/*
  Generated on ${new Date().toISOString()} from
  \`\`\`
  ${JSON.stringify(enumSpec, null, 2)}
  \`\`\`
 */

export enum ${enumName} {
  ${fieldNamesUpper.map(({ caps, lower }) => `${caps} = "${lower}",`).join("\n  ")}
}

export interface ${nameCaps} {
  ${fieldNamesUpper.map(({ caps, type }) => `[${enumName}.${caps}]: ${type};`).join("\n  ")}
}

export const ${name}Enum = {
  ${fieldNamesUpper.map(({ caps }) => `[${enumName}.${caps}]: ${enumName}.${caps},`).join("\n  ")}
} as Enum;
`.trim();
};

const main = async (opts = {}) => {
  const { write } = opts;

  for (const es of spec.enums) {
    const output = gen(es);
    if (write) {
      const outfile = path.join("lib/translators", `${es.name}-enum.ts`);
      fs.writeFileSync(outfile, output);
      console.log(`Wrote to ${outfile}`);
    } else {
      console.log(output);
    }
  }
};

export default main;
