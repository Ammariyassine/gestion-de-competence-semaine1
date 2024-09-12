const DataManager = require("../Data/DataManager");
const readData = DataManager.readData;
const writeData = DataManager.writeData;

const Add = (first_name, last_name) => {
  let ApprenantArray = readData();

  let Apprenant = {
    id: ApprenantArray.length + 1,
    first_name: first_name,
    last_name: last_name,
  };

  ApprenantArray.push(Apprenant);
  writeData(ApprenantArray);
};

module.exports = {
  Add
}
