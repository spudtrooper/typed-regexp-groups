import fs from "fs";

export const modes = {
  new_version: "new_version",
  inc_patch: "inc_patch",
  inc_minor: "inc_minor",
  inc_major: "inc_major",
};

const getNewVersion = (version, mode, newVersion) => {
  if (version === modes.new_version) {
    return newVersion;
  }
  const [major, minor, patch] = version.split(".");
  switch (mode) {
    case modes.inc_patch: return `${major}.${minor}.${parseInt(patch) + 1}`;
    case modes.inc_minor: return `${major}.${parseInt(minor) + 1}.0`;
    case modes.inc_major: return `${parseInt(major) + 1}.0.0`;
  }
  throw new Error(`unknown mode: ${mode}`);
};

const main = async (opts = {}) => {
  let { packageFile, mode, write, new_version } = opts;

  if (!new_version && !mode && !packageFile) {
    throw new Error("missing newVersion or mode");
  }

  const pkg = JSON.parse(fs.readFileSync(packageFile, "utf8"));
  const { version } = pkg;
  if (!version) {
    throw new Error(`missing version in ${packageFile}`);
  }
  const newVersion = new_version || getNewVersion(version, mode, new_version),
    oldVersion = version;

  if (!write) {
    console.log(`would change ${packageFile} (${pkg.name}) ${oldVersion} -> ${newVersion}`);
    return;
  }

  const newPkg = { ...pkg, version: newVersion };
  fs.writeFileSync(packageFile, JSON.stringify(newPkg, null, 2));
  console.log(`changed ${packageFile} (${pkg.name}) ${oldVersion} -> ${newVersion}`);
};

export default main;
