import test from "ava";
import DateToString from "../../src/date-to-string.js";

test("Wednesday, 30th May, 2018", t => {
  t.is(DateToString(new Date("05/30/2018")), "Wednesday, 30th May, 2018");
});
