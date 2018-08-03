import { join } from "path";

import * as fs from "fs";
import * as semver from "semver";

export function VersionifyMiddleware(
  defaultVersion: string = "1.0.0",
  headerValue: string = "x-api-version"
) {
  return function(req, res, next) {
    const ver: string = req.headers[headerValue] || defaultVersion;
    if (semver.valid(ver)) {
      req["versionify"] = new Versionify(ver);
    }

    next();
  };
}

export class Versionify {
  private pathCache: { [key: string]: string[] } = {};

  constructor(private version: string) {}

  public invoke(path: string, root: string, funcName: string) {
    const allVersions: string[] = this.getFiles(path, root);

    try {
      const result = require(join(path, `${root}.${this.version}`));
      return result[funcName];
    } catch (e) {
      const result = require(join(path, allVersions[allVersions.length - 1]));
      return result[funcName];
    }
  }

  private getFiles(path: string, root: string): string[] {
    const key: string = `${path}-${root}`;
    if (this.pathCache[key] !== undefined) {
      return this.pathCache[path];
    } else {
      this.pathCache[key] = fs
        .readdirSync(path)
        .filter(val => val.indexOf(root) !== -1)
        .sort();
      return this.pathCache[key];
    }
  }
}
