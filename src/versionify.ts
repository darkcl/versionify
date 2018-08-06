import { join } from "path";

import * as fs from "fs";
import * as semver from "semver";

export function versioning(
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

interface VersionInfo {
  version: string;
  path: string;
}

export class Versionify {
  private pathCache: { [key: string]: string[] } = {};

  constructor(private version: string) {}

  public invoke(path: string, root: string, funcName: string) {
    const regex = new RegExp(`.*${root}.(.*?).js*`);

    const allVersions: string[] = this.getFiles(path, root);
    const defaultVersionFile: VersionInfo = allVersions
      .filter(val => (val.match(regex) ? false : true))
      .map(val => <VersionInfo>{ version: "default", path: val })[0];
    const versionsArr: VersionInfo[] = allVersions
      .filter(val => (val.match(regex) ? true : false))
      .map(val => {
        let versionStr: string = val.replace(regex, "$1");
        return <VersionInfo>{ version: versionStr, path: val };
      })
      .filter(val => semver.lt(val.version, this.version));

    try {
      const result = require(join(path, `${root}.${this.version}`));
      return result[funcName];
    } catch (e) {
      let file = defaultVersionFile.path;
      if (
        versionsArr.length != 0 &&
        semver.gt(this.version, versionsArr[versionsArr.length - 1].version)
      ) {
        file = versionsArr[versionsArr.length - 1].path;
      }
      const result = require(join(path, file));
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
