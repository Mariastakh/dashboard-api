const csv = require("csv-parser");
const fs = require("fs");
let s;
const comparisonResults = [];
module.exports = (team) => {
  try {
    let results = [];

    //let s = 0;
    console.log("team inside function: ", team);
    fs.createReadStream("football-data.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        // for (let i = 0; i < results.length; i++) {
        //   if (results[i].HomeTeam == team) {
        //     if (results[i].FTR == "H") {
        //       comparisonResults.push(results[i].AwayTeam);
        //     }
        //   } else if (results[i].AwayTeam == team) {
        //     if (results[i].FTR == "A") {
        //       comparisonResults.push(results[i].HomeTeam);
        //     }
        //   }
        // }
        comparisonResults.push(Math.random());
        return comparisonResults;
      });
    console.log(comparisonResults);
    return comparisonResults;
  } catch (error) {
    // console.log("inside gateway error catch block");
    throw error;
  }
};
