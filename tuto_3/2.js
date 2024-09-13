function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data retrieved");
    }, 1000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data processed : ${data}`);
    }, 500);
  });
}

getData()
  .then((data) => processData(data))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
