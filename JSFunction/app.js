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
