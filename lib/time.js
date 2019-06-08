const moment = require("moment");

function TimeRelative(timeVal) {
  return moment(timeVal).fromNow();
}

module.exports = { TimeRelative };
