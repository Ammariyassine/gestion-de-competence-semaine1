const fs = require("fs");

const array = ["apple", "banana", "orange", 42];

const data = JSON.stringify(array);

fs.writeFile("tuto_2.json", data, (err) => {
  if (err) {
    console.error(err);
  }
});

fs.readFile("tuto_2.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const paredArray = JSON.parse(data);
    console.log(paredArray);
  }
});
