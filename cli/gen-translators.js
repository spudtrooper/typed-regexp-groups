import fs from "fs";
import path from "path";

const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

const toUpperCamelCase = (str) => {
  const cc = toCamelCase(str);
  return cc.charAt(0).toUpperCase() + cc.slice(1);
};

const generateImportsAndExports = (dir) => {
  const files = fs.readdirSync(dir);

  const imports = [];
  const exports = [];

  files.forEach(file => {
    if (file.endsWith('.ts')
      && file.indexOf('-enum.ts') === -1
      && file.indexOf('-spec.ts') === -1
      && file !== 'index.ts') {
      const baseName = path.basename(file, '.ts'),
        className = toUpperCamelCase(baseName) + "Translator";

      imports.push(`import ${className} from "./${baseName}";`);
      exports.push(`  ${className}`);
    }
  });

  const importString = imports.join('\n');
  const exportString = `const all = {\n${exports.join(',\n')}\n};\n\nexport default all;`;

  return `${importString}\n\n${exportString}`;
};

const main = async (opts = {}) => {
  const { dir, outfile, write } = opts;

  const output = generateImportsAndExports(dir);

  if (write) {
    fs.writeFileSync(outfile, output);
    console.log(`Wrote to ${outfile}`);
  } else {
    console.log(output);
  }
};

export default main;
