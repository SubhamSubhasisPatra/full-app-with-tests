let d = {
  name: "subham",
  age: "22",
  address: {
    city: "bangalore",
    state: "karnataka",
    country: "india",
  },
};

module.exports = class Checkout {
  constructor() {
    // console.log("Checkout class created");
  }
  AppCompatibility() {
    return { key: "value" };
  }

  get name() {
    return d;
  }
};
