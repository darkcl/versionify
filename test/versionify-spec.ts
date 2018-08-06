import { Versionify } from "../src";
import { expect } from "chai";
import { join } from "path";

describe("Versionify", () => {
  it("should read respective version function", () => {
    const sut: Versionify = new Versionify("1.0.0");

    const funcV1: Function = sut.invoke(
      join(__dirname, "./fixture"),
      "func",
      "hello"
    );
    expect(funcV1()).to.equal("hello 1.0.0");

    const sut2: Versionify = new Versionify("1.0.1");
    const funcV101: Function = sut2.invoke(
      join(__dirname, "./fixture"),
      "func",
      "hello"
    );
    expect(funcV101()).to.equal("hello 1.0.1");
  });

  it("should fallback version function", () => {
    const sut: Versionify = new Versionify("1.0.3");

    const funcV1: Function = sut.invoke(
      join(__dirname, "./fixture"),
      "func",
      "hello"
    );
    expect(funcV1()).to.equal("hello 1.0.2");
  });

  it("should fallback to previous version function", () => {
    const sut: Versionify = new Versionify("0.0.1");

    const funcV1: Function = sut.invoke(
      join(__dirname, "./fixture"),
      "func",
      "hello"
    );
    expect(funcV1()).to.equal("hello 0.0.1");
  });

  it("should cache file paths", () => {
    const sut: Versionify = new Versionify("1.0.0");

    const funcV1: Function = sut.invoke(
      join(__dirname, "./fixture"),
      "func",
      "hello"
    );
    const pathCache = sut["pathCache"];
    expect(pathCache[`${join(__dirname, "./fixture")}-func`].length).to.equal(
      4
    );
  });
});
