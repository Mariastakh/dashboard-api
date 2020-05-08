const csv = require("csv-parser");
const fs = require("fs");
const results = [];
const comparisonResults = [];

module.exports = async (team) => {
  fs.createReadStream("football-data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      for (let i = 0; i < results.length; i++) {
        if (results[i].HomeTeam == team) {
          if (results[i].FTR == "H") {
            comparisonResults.push(results[i].AwayTeam);
          }
        } else if (results[i].AwayTeam == team) {
          if (results[i].FTR == "A") {
            comparisonResults.push(results[i].HomeTeam);
          }
        }
      }
    });
  let set = new Set(comparisonResults);
  const filteredArray = [...set];
  return filteredArray;
};
