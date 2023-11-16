#!/usr/bin/env node

import { program } from "commander";

import genTranslators from "./gen-translators.js";
import upPackageVersion, { modes as upVersionModes } from "./up-package-version.js";

program
  .version("0.0.1")
  .description("The typedregexp CLI");

program
  .command("gen-translators")
  .option("-o, --outfile <filename>", "Output file", "lib/translators/index.ts")
  .option("-d, --dir <dirname>", "Directory to search", "lib/translators")
  .option("-w, --write", "Write to file")
  .action(genTranslators);

  program
  .command("up-package-version")
  .option("-f, --package-file <filename>", "The package file", "package.json")
  .option("-n, --new_version <string>", "New version")
  .option("--mode", "Mode fo changing the version", upVersionModes.inc_patch)
  .option("-w, --write", "Write to file", false)
  .action(upPackageVersion);  

program.parse(process.argv);