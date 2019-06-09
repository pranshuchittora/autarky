const moment = require("moment");

const config = require("../config.json");

function TimeRelative(timeVal) {
  const timeNow = new Date().getTime();
  const timeDiff = timeNow - timeVal;
  return moment(timeVal).fromNow();
}

/**
 *
 * Converts time in months to milliseconds
 *
 * @param {Number} timeMonths - Time in months
 * @returns {Number} timeMilli - Return time in milliSeconds
 */

function TimeMonthToMilli(time) {
  return time * 2.628e9;
}

module.exports = { TimeRelative, TimeMonthToMilli };
