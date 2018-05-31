import test from "ava";
import TimeRangeToString from "../../src/time-range-to-string.js";

test("2:00 PM - 3:00 PM", t => {
  var timeRange = {
    start: new Date("8/14/2018 2:00 PM"),
    end: new Date("8/14/2018 3:00 PM")
  };
  t.is(TimeRangeToString(timeRange), "2:00 PM - 3:00 PM");
});

test("14:00 -> 16:00", t => {
  var timeRange = {
    start: new Date("8/14/2018 2:00 PM"),
    end: new Date("8/14/2018 4:00 PM")
  };
  var config = {
    locale: "en-US",
    format: {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    },
    separator: "->"
  }
  t.is(TimeRangeToString(timeRange, config), "14:00 -> 16:00");
});
