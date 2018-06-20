import { Versionify } from "../src";
import * as chai from "chai";

const expect = chai.expect;

describe("Versionify", () => {
  it("should greet with message", () => {
    const greeter = new Versionify("friend");
    expect(greeter.greet()).to.equal("Bonjour, friend!");
  });
});
