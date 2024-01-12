const { log } = require("console");
const fs = require("fs");

const util = require("util");
const create = util.promisify(fs.writeFile);

// create('./cosa.json', JSON.stringify( {}))

const caracters = "qwertyuiopasdfghjklñzxcvbnm1234567890".split("");
const number = "1234567890".split("").map((num) => parseInt(num));

function getRandomArbitrary({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min) + min);
}

const generator = (params = [], ammount, model) => {
  const data = [];
  for (let i = 0; i < ammount; i++) {
    const entry = {
        "model": model,
        "fields": {
            "name" : "asd",
            "age" : 1
         } 
    };
    params.map((par) => {
      let word = "";
      let arr;

      switch (par.arr) {
        case "caracters":
          arr = caracters;
          break;
        case "number":
          arr = number;
          break;
      }

      for (let i = 0; i < par.len; i++) {
        const index = getRandomArbitrary({ max: arr.length });
        if (word == undefined) {
          word = arr[index];
        } else {
          word += arr[index];
        }
      }
      if (par.arr == "number") {
        word = parseInt(word);
      }
      entry.fields[par.field] = word;
    });
    data.push(entry);
  }
  return data;
};

const data = generator(
  [
    { field: "name", len: 10, arr: "caracters" },
    { field: "age", len: 2, arr: "number" },
  ],
  100,
  "cosa.cosa",
  
);

create("cosa.json", JSON.stringify(data))