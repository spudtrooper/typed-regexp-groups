#!/usr/bin/env node

import { program } from "commander";

import genTranslators from "./gen-translators.js";

program
  .version("0.0.1")
  .description("The typedregexp CLI");

program
  .command("gen-translators")
  .description("dummy command")
  .option("-o, --outfile <filename>", "Output file", "lib/translators/index.ts")
  .option("-d, --dir <dirname>", "Directory to search", "lib/translators")
  .option("-w, --write", "Write to file")
  .action(genTranslators);

program.parse(process.argv);