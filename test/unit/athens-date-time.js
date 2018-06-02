import test from "ava";
import { DateTime } from "luxon";
import * as AthensDateTime from "../../src/athens-date-time.js";

test("2018-05-31T22:40", t => {
  var dateTime = AthensDateTime.create("2018-05-31T22:40");
  t.deepEqual(
    dateTime,
    DateTime.fromISO("2018-05-31T22:40")
      .setZone("America/New_York")
      .setLocale("en-US")
  );
  t.is(AthensDateTime.dateToString(dateTime), "Thursday, May 31, 2018");
  t.is(AthensDateTime.timeToString(dateTime), "10:40 PM");
  t.is(AthensDateTime.dateTimeToString(dateTime), "5/31/2018, 10:40 PM")
});

test("2018-05-31T22:40 - 2018-05-31T23:59", t => {
  var dateTimeStart = AthensDateTime.create("2018-05-31T22:40");
  var dateTimeEnd = AthensDateTime.create("2018-05-31T23:59");
  t.is(
    AthensDateTime.timeRangeToString(dateTimeStart, dateTimeEnd),
    "10:40 PM - 11:59 PM"
  );
});

test("hasSameDay(2018-03-01T01:00, 2018-03-01T23:30)", t => {
  var dateTime1 = AthensDateTime.create("2018-03-01T01:00");
  var dateTime2 = AthensDateTime.create("2018-03-01T23:30");
  t.true(AthensDateTime.hasSameDate(dateTime1, dateTime2));
})

test("!hasSameDay(2018-03-01T01:00, 2018-03-02T00:00)", t => {
  var dateTime1 = AthensDateTime.create("2018-03-01T01:00");
  var dateTime2 = AthensDateTime.create("2018-03-02T00:00");
  t.false(AthensDateTime.hasSameDate(dateTime1, dateTime2));
})
