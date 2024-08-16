const moment = require("moment");

const formatDateRange = (start, end) => ({
  start: start.format("DD/MM/YYYY"),
  end: end.format("DD/MM/YYYY"),
});

const getDatesRange = (date, type) => {
  const chosenDate = moment(date, "DD/MM/YYYY");

  let start, end;

  switch (type) {
    case "week":
      start = chosenDate.clone().startOf("isoWeek");
      end = chosenDate.clone().endOf("isoWeek");
      break;
    case "month":
      start = chosenDate.clone().startOf("month");
      end = chosenDate.clone().endOf("month");
      break;
    default:
      start = end = chosenDate;
  }

  return formatDateRange(start, end);
};

module.exports = { getDatesRange };
