import { join } from "path";

import * as fs from "fs";

export class Versionify {
  constructor(private version: string) {}

  public invoke(path: string, root: string, funcName: string) {
    const allVersions: string[] = fs
      .readdirSync(path)
      .filter(val => val.indexOf(root) !== -1)
      .sort();

    try {
      const result = require(join(path, `${root}.${this.version}`));
      return result[funcName];
    } catch (e) {
      const result = require(join(path, allVersions[allVersions.length - 1]));
      return result[funcName];
    }
  }
}
