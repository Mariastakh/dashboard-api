const csv = require("csv-parser");
const fs = require("fs");
let s;
const comparisonResults = [];
module.exports = async (options) => {
  let results = [];

  //let s = 0;
  // console.log("team inside function: ", options.team);

  const thing = await fs
    .createReadStream("football-data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      //comparisonResults.push(Math.random());
      options.res.json({
        losingTeams: ["something", "else"],
      });
      // console.log("RESULTS INSIDE GETTEAMS", results[0].HomeTeam);
      //return results;
      //return comparisonResults;
    });
};
