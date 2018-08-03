import { VersionifyMiddleware } from "../src";
import { expect } from "chai";
import { join } from "path";

describe("VersionifyMiddleware", () => {
  it("should add versionify property in req", () => {
    const req = {
      headers: {}
    };
    const res = {};
    let nextCalled = false;
    const next = function() {
      nextCalled = true;
    };

    const sut = VersionifyMiddleware("1.0.0");

    sut(req, res, next);

    expect(req["versionify"]).to.not.be.undefined;
    expect(req["versionify"]["version"]).to.be.equal("1.0.0");
    expect(nextCalled).to.be.true;
  });

  it("should add header version to versionify property in req", () => {
    const req = {
      headers: {
        "x-api-version": "1.0.1"
      }
    };
    const res = {};
    let nextCalled = false;
    const next = function() {
      nextCalled = true;
    };

    const sut = VersionifyMiddleware("1.0.0");

    sut(req, res, next);

    expect(req["versionify"]).to.not.be.undefined;
    expect(req["versionify"]["version"]).to.be.equal("1.0.1");
    expect(nextCalled).to.be.true;
  });

  it("should add customized header version to versionify property in req", () => {
    const req = {
      headers: {
        "endpoint-version": "1.0.1"
      }
    };
    const res = {};
    let nextCalled = false;
    const next = function() {
      nextCalled = true;
    };

    const sut = VersionifyMiddleware("1.0.0", "endpoint-version");

    sut(req, res, next);

    expect(req["versionify"]).to.not.be.undefined;
    expect(req["versionify"]["version"]).to.be.equal("1.0.1");
    expect(nextCalled).to.be.true;
  });

  it("should use valid semver", () => {
    const req = {
      headers: {
        "endpoint-version": "aaaaaa"
      }
    };
    const res = {};
    let nextCalled = false;
    const next = function() {
      nextCalled = true;
    };

    const sut = VersionifyMiddleware("1.0.0", "endpoint-version");

    sut(req, res, next);

    expect(req["versionify"]).to.be.undefined;
    expect(nextCalled).to.be.true;
  });
});
