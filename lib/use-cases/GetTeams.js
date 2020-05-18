const csv = require("csv-parser");
const fs = require("fs");
let s;
module.exports = async (options) => {
  let results = [];

  function filterDuplicates(a) {
    var seen = {};
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  }

  //let s = 0;
  // console.log("team inside function: ", options.team);
  const team =
    options.winningTeam.charAt(0).toUpperCase() + options.winningTeam.slice(1);

  await fs
    .createReadStream("football-data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const comparisonResults = [];
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
      const filteredResults = filterDuplicates(comparisonResults);

      options.res.json({
        losingTeams: filteredResults,
      });
    });
};
