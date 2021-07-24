// Pure function
// if the function do not change the outside state, it can be pure function

let add = (a, b) => a + b;

console.log(add(10, 20));

// Side effect
// if the function change the outside state, it is not pure function

let res = ["play", "gaming", "cooking"];
let showHobbies = (h) => {
  res.push(h);
  console.log(res);
};

showHobbies("reading");
showHobbies("edting");

// Factory function
// if the function return a new object or a new Function, it is a factory function

let createTaxCalculator = (tax) => {
  function calculateAmount(amount) {
    return tax * amount;
  }

  return calculateAmount;
};

let vatTax = createTaxCalculator(0.12);
let incomeTax = createTaxCalculator(0.18);

console.log(vatTax(100));
console.log(incomeTax(100));
