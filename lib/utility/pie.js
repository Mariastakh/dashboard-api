const jsonPie = require("./clothing-api.json");
module.exports = async (options) => {
  //console.log(jsonPie.payload);

  let hoodie = 0;
  let sweater = 0;
  let jumper = 0;
  let jacket = 0;
  let blazer = 0;
  let raincoat = 0;

  for (let i = 0; i < jsonPie.payload.length; i++) {
    const type = jsonPie.payload[i].clothe;

    if (type === "hoodie") {
      hoodie += 1;
    } else if (type == "sweater") {
      sweater += 1;
    } else if (type === "jumper") {
      jumper += 1;
    } else if (type === "jacket") {
      jacket += 1;
    } else if (type === "blazer") {
      blazer += 1;
    } else if (type === "raincoat") {
      raincoat += 1;
    }
  }

  console.log("Hoodie: ", hoodie);
  console.log("Sweater: ", sweater);
  console.log("Jumper: ", jumper);
  console.log("Jacket: ", jacket);
  console.log("Blazer: ", blazer);
  console.log("Raincoat: ", raincoat);
  return "pie thing";
};
