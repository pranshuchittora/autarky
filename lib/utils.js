const config = require("../config.json");
const { TimeMonthToMilli } = require("./time");

function validDiff(timeVal) {
  const MinTimeThreshold = TimeMonthToMilli(config.file_age);
  return timeVal >= MinTimeThreshold ? true : false;
}

module.exports = {
  validDiff
};
