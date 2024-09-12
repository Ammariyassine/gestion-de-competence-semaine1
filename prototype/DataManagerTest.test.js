const DataManager = require("./Data/DataManager");
const readData = DataManager.readData;
const writeData = DataManager.writeData;

const array = [
  {
    first_name: "yassine",
    last_name: "ammari",
  },
];

writeData(array);

console.log(readData());
