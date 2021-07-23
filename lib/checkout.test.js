const chai = require("chai");
const expect = require("chai").expect;
const Checkout = require("./checkout");
const sinon = require("sinon");

describe("Test a Class", () => {
  let checkout;
  beforeEach(() => {
    checkout = new Checkout();
    expect(checkout).to.be.a.instanceOf(Checkout);
  });

  afterEach(() => {});

  it("Should check for the app comaptibility", () => {
    let spy = sinon.spy(checkout, "AppCompatibility");
    expect(checkout.AppCompatibility()).to.be.deep.equal({ key: "value" });
    expect(spy.calledOnce).to.be.true;
    expect(spy.firstCall.args.length).to.be.equal(0);
  });
});
