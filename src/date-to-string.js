export default date => {
  var weekday = weekdays[date.getDay()];
  var year = date.getFullYear();
  var day = date.getDate();
  var monthName = monthNames[date.getMonth()];
  return weekday + ", " + day + "th " + monthName + ", " + year;
};

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
