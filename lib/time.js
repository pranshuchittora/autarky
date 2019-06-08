const moment = require("moment");

function TimeDifference(timeBig, timeSmall) {
  return moment(timeSmall).fromNow();
}

module.exports = { TimeDifference };
