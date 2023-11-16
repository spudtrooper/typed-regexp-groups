import path from "path";
import fs from "fs";

export const modes = {
  new_version: "new_version",
  inc_patch: "inc_patch",
  inc_minor: "inc_minor",
  inc_major: "inc_major",
};

const dirs = ["cli", "."];

const log = (...args) => {
  console.log(...args);
};

const getNewVersion = (version, mode) => {
  const [major, minor, patch] = version.split(".");
  switch (mode) {
    case "inc_patch": return `${major}.${minor}.${parseInt(patch) + 1}`;
    case "inc_minor": return `${major}.${parseInt(minor) + 1}.0`;
    case "inc_major": return `${parseInt(major) + 1}.0.0`;
  }
  throw new Error(`unknown mode: ${mode}`);
};

const main = async (opts = {}) => {
  let { packageFile, mode, write, new_version } = opts;

  if (!new_version && !mode && !packageFile) {
    throw new Error("missing newVersion or mode");
  }

  const readNewVersion = (pkgFile) => {
    const pkg = JSON.parse(fs.readFileSync(pkgFile, "utf8"));
    const { version } = pkg;
    if (!version) {
      throw new Error(`missing version in ${pkgFile}`);
    }
    const newVersion = new_version || getNewVersion(version, mode),
      oldVersion = version;
    return { pkg, oldVersion, newVersion };
  };

  const { pkg, oldVersion, newVersion } = readNewVersion(packageFile);
  if (!write) {
    console.log(`would change ${packageFile} (${pkg.name}) ${oldVersion} -> ${newVersion}`);
    return;
  }
  const newPkg = { ...pkg, version: newVersion };
  fs.writeFileSync(packageFile, JSON.stringify(newPkg, null, 2));
  log(`changed ${packageFile} (${pkg.name}) ${oldVersion} -> ${newVersion}`);
};

export default main;
