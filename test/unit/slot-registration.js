import test from "ava";
import SlotRegistration from "../../src/slot-registration.js";
import * as AthensDateTime from "../../src/athens-date-time.js";
import { DateTime } from 'luxon';

test.before(t => {
  t.context.configs = {
    rich: {
      slotRanges: [
        {
          time: {
            start: AthensDateTime.create("2018-08-15T09:00"),
            end: AthensDateTime.create("2018-08-15T12:00")
          },
          location: "Library"
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-15T13:00"),
            end: AthensDateTime.create("2018-08-15T16:00")
          }
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-16T09:00"),
            end: AthensDateTime.create("2018-08-16T12:00")
          },
          location: "Auditorium"
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-17T11:00"),
            end: AthensDateTime.create("2018-08-17T12:00")
          }
        }
      ],
      slotLength: 15,
      slotCapacity: 5
    },
    actual: {
      slotRanges: [
        {
          time: {
            start: AthensDateTime.create("2018-08-15T09:00"),
            end: AthensDateTime.create("2018-08-15T12:00")
          }
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-15T13:00"),
            end: AthensDateTime.create("2018-08-15T16:00")
          }
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-16T09:00"),
            end: AthensDateTime.create("2018-08-16T12:00")
          }
        }
      ],
      slotLength: 15,
      slotCapacity: 10
    },
    sameTimesDifferentLocations: {
      slotRanges: [
        {
          time: {
            start: AthensDateTime.create("2018-08-16T13:15"),
            end: AthensDateTime.create("2018-08-16T14:30")
          },
          location: "Baker Center, Room 230"
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-16T13:15"),
            end: AthensDateTime.create("2018-08-16T14:30")
          },
          location: "Baker Center, Room 239"
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-16T14:30"),
            end: AthensDateTime.create("2018-08-16T15:45")
          },
          location: "Baker Center, Room 230"
        },
        {
          time: {
            start: AthensDateTime.create("2018-08-16T14:30"),
            end: AthensDateTime.create("2018-08-16T15:45")
          },
          location: "Baker Center, Room 239"
        }
      ],
      slotLength: 75,
      slotCapacity: 10
    },
    differentCapacityPerSlot: {
      slotRanges: [
        {
          time: {
            start: AthensDateTime.create("2005-03-01T14:00"),
            end: AthensDateTime.create("2005-03-01T15:00")
          },
          slotCapacity: 5
        },
        {
          time: {
            start: AthensDateTime.create("2005-03-02T16:00"),
            end: AthensDateTime.create("2005-03-02T17:00")
          },
          slotCapacity: 3
        },
        {
          time: {
            start: AthensDateTime.create("2005-03-02T18:00"),
            end: AthensDateTime.create("2005-03-02T19:00")
          }
        }
      ],
      slotCapacity: 10,
      slotLength: 60
    },
    simple: {
      slotRanges: [
        {
          time: {
            start: AthensDateTime.create("2001-09-12T10:00"),
            end: AthensDateTime.create("2001-09-12T11:00")
          }
        }
      ],
      slotLength: 15,
      slotCapacity: 10
    },
    break: {
      slotRanges: [
        {
          time: {
            start: AthensDateTime.create("2005-01-05T08:00"),
            end: AthensDateTime.create("2005-01-05T11:00")
          }
        }
      ],
      slotLength: 45,
      breakLength: 15,
      slotCapacity: 10
    }
  };
});

test("constructor", t => {
  var registration = new SlotRegistration(t.context.configs.simple);

  t.is(registration.slotLength, 15);
});

test("set slots", t => {
  var registration = new SlotRegistration(t.context.configs.simple);

  registration.setSlots([
    {
      time: AthensDateTime.create("2001-09-12T10:00"),
      location: "Toilet"
    }
  ]);
  t.deepEqual(registration.slots, [
    {
      time: AthensDateTime.create("2001-09-12T10:00"),
      location: "Toilet"
    }
  ]);
  // make sure `setDefaultOccupancies()` runs
  t.deepEqual(registration.occupancies, [
    {
      date: AthensDateTime.create("2001-09-12T10:00"),
      count: 0
    }
  ]);
});

test("calculate slots", t => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: AthensDateTime.create("2001-09-12T10:00"),
          end: AthensDateTime.create("2001-09-12T11:00")
        },
        location: "Library"
      },
      {
        time: {
          start: AthensDateTime.create("2001-09-15T17:00"),
          end: AthensDateTime.create("2001-09-15T18:00")
        }
      }
    ],
    slotLength: 30,
    slotCapacity: 10
  });

  t.deepEqual(registration.slots, [
    {
      time: AthensDateTime.create("2001-09-12T10:00"),
      location: "Library",
      capacity: 10
    },
    {
      time: AthensDateTime.create("2001-09-12T10:30"),
      location: "Library",
      capacity: 10
    },
    {
      time: AthensDateTime.create("2001-09-15T17:00"),
      capacity: 10
    },
    {
      time: AthensDateTime.create("2001-09-15T17:30"),
      capacity: 10
    }
  ]);
});

test("calculate slots 2", t => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: AthensDateTime.create("2018-08-15T11:00"),
          end: AthensDateTime.create("2018-08-15T12:00")
        }
      }
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  t.deepEqual(registration.slots, [
    {
      time: AthensDateTime.create("2018-08-15T11:00"),
      capacity: 10
    },
    {
      time: AthensDateTime.create("2018-08-15T11:15"),
      capacity: 10
    },
    {
      time: AthensDateTime.create("2018-08-15T11:30"),
      capacity: 10
    },
    {
      time: AthensDateTime.create("2018-08-15T11:45"),
      capacity: 10
    }
  ]);
});
test("get unique dates in slots", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  var uniqueDates = registration.getUniqueDatesInSlots();
  t.is(uniqueDates.length, 2);
  t.true(
    AthensDateTime.hasSameDate(
      uniqueDates[0],
      AthensDateTime.create("2018-08-15")
    )
  );
  t.true(
    AthensDateTime.hasSameDate(
      uniqueDates[1],
      AthensDateTime.create("2018-08-16")
    )
  );
});

test("set default occupancies", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.is(registration.occupancies.length, 2);
  t.true(
    AthensDateTime.hasSameDate(
      registration.occupancies[0].date,
      AthensDateTime.create("2018-08-15")
    )
  );
  t.true(
    AthensDateTime.hasSameDate(
      registration.occupancies[1].date,
      AthensDateTime.create("2018-08-16")
    )
  );
  t.is(registration.occupancies[0].count, 0);
  t.is(registration.occupancies[1].count, 0);
});

test("set occupancy", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  registration.setOccupancy(AthensDateTime.create("2018-08-15"), 15);
  registration.setOccupancy(AthensDateTime.create("2018-08-16"), 30);

  t.is(registration.occupancies.length, 2);
  t.true(
    AthensDateTime.hasSameDate(
      registration.occupancies[0].date,
      AthensDateTime.create("2018-08-15")
    )
  );
  t.true(
    AthensDateTime.hasSameDate(
      registration.occupancies[1].date,
      AthensDateTime.create("2018-08-16")
    )
  );
  t.is(registration.occupancies[0].count, 15);
  t.is(registration.occupancies[1].count, 30);

  t.throws(
    () => {
      registration.setOccupancy(AthensDateTime.create("2000-05-02"), 0);
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );
});

test("count occupants in day", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  registration.setOccupancy(AthensDateTime.create("2018-08-15"), 15);
  t.is(
    registration.countOccupantsInDay(AthensDateTime.create("2018-08-15")),
    15
  );

  t.throws(
    () => {
      registration.countOccupantsInDay(AthensDateTime.create("2000-05-02"));
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );
});

test("set arrival date", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  registration.setArrivalDate(AthensDateTime.create("2018-08-16"));
  t.deepEqual(registration.arrivalDate, AthensDateTime.create("2018-08-16"));
});

test("get max occupants in day", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.is(
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15")),
    240
  );
  t.is(
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16")),
    120
  );

  t.throws(
    () => {
      registration.getMaxOccupantsInDay(AthensDateTime.create("2018-05-02"));
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );
});

test("is available for date", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.true(registration.isAvailableForDate(AthensDateTime.create("2018-08-10")));
  t.true(registration.isAvailableForDate(AthensDateTime.create("2018-08-15")));
  registration.setArrivalDate(AthensDateTime.create("2018-08-15"));
  t.false(registration.isAvailableForDate(AthensDateTime.create("2018-08-15")));
  t.true(registration.isAvailableForDate(AthensDateTime.create("2018-08-16")));
});

test("get earliest time available", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  registration.setArrivalDate(AthensDateTime.create("2018-08-15"));
  t.deepEqual(
    registration.getEarliestTimeAvailable(),
    AthensDateTime.create("2018-08-16")
  );
});

test("is day full", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.is(registration.isDayFull(AthensDateTime.create("2018-08-15")), false);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15"))
  );
  t.is(registration.isDayFull(AthensDateTime.create("2018-08-15")), true);

  t.throws(
    () => {
      registration.isDayFull(AthensDateTime.create("2000-05-02"));
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );

  registration.occupancies.unshift({
    date: AthensDateTime.create("2000-05-02"),
    count: 5
  });
  t.throws(
    () => {
      registration.isDayFull(AthensDateTime.create("2000-05-02"));
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );
});

test("get first available slot", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.deepEqual(registration.getFirstAvailableSlot(), {
    time: AthensDateTime.create("2018-08-15T09:00")
  });
});

test("1st person", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:00"),
    location: "Library"
  });
});

test("2nd person", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(AthensDateTime.create("2018-08-15"), 1);
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:00"),
    location: "Library"
  });
});

test("last person in 1st slot", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    t.context.configs.rich.slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:00"),
    location: "Library"
  });
});

test("1st person in 2nd slot", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    t.context.configs.rich.slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:15"),
    location: "Library"
  });
});

test("last person of 1st day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15")) - 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T15:45")
  });
});

test("1st person of 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15"))
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T09:00"),
    location: "Auditorium"
  });
});

test("2nd person of 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15"))
  );
  registration.setOccupancy(AthensDateTime.create("2018-08-16"), 1);
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T09:00"),
    location: "Auditorium"
  });
});

test("last person", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-17"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-17")) - 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-17T11:45")
  });
});

test("1st person arriving on 1st day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setArrivalDate(AthensDateTime.create("2018-08-15"));
  // People are only registered into slots at least one day after they arrive
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T09:00"),
    location: "Auditorium"
  });
});

test("2nd person arriving on 1st day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(AthensDateTime.create("2018-08-16"), 1);
  registration.setArrivalDate(AthensDateTime.create("2018-08-15"));
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T09:00"),
    location: "Auditorium"
  });
});

test("1st person on 1st day with 1 person already on 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(AthensDateTime.create("2018-08-16"), 1);
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:00"),
    location: "Library"
  });
});

test("last person of 1st day with 1 person already on 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(AthensDateTime.create("2018-08-16"), 1);
  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15")) - 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T15:45")
  });
});

test(
  "1st person of new slot on 2nd day arriving on 1st day, 1 person already" +
    " on 1st day",
  t => {
    var registration = new SlotRegistration(t.context.configs.rich);

    registration.setOccupancy(AthensDateTime.create("2018-08-15"), 1);
    registration.setOccupancy(
      AthensDateTime.create("2018-08-16"),
      t.context.configs.rich.slotCapacity
    );
    registration.setArrivalDate(AthensDateTime.create("2018-08-15"));
    t.deepEqual(registration.register(), {
      time: AthensDateTime.create("2018-08-16T09:15"),
      location: "Auditorium"
    });
  }
);

test("1st person arriving on 1st day, 1st day already full", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15"))
  );
  registration.setArrivalDate(AthensDateTime.create("2018-08-15"));
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T09:00"),
    location: "Auditorium"
  });
});

test("calculate slots, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  t.deepEqual(registration.slots, [
    {
      time: AthensDateTime.create("2018-08-16T13:15"),
      location: "Baker Center, Room 230",
      capacity: 10
    },
    {
      time: AthensDateTime.create("2018-08-16T13:15"),
      location: "Baker Center, Room 239",
      capacity: 10
    },
    {
      time: AthensDateTime.create("2018-08-16T14:30"),
      location: "Baker Center, Room 230",
      capacity: 10
    },
    {
      time: AthensDateTime.create("2018-08-16T14:30"),
      location: "Baker Center, Room 239",
      capacity: 10
    }
  ]);
});

test("set occupancy, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(AthensDateTime.create("2018-08-16"), 5);
  t.is(registration.occupancies.length, 1);
  t.true(
    AthensDateTime.hasSameDate(
      registration.occupancies[0].date,
      AthensDateTime.create("2018-08-16")
    )
  );
  t.is(registration.occupancies[0].count, 5);
});

test("is day full, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  t.is(registration.isDayFull(AthensDateTime.create("2018-08-16")), false);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16"))
  );
  t.is(registration.isDayFull(AthensDateTime.create("2018-08-16")), true);
});

test("1st person, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T13:15"),
    location: "Baker Center, Room 230"
  });
});

test("2nd person, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(AthensDateTime.create("2018-08-16"), 1);
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T13:15"),
    location: "Baker Center, Room 230"
  });
});

test("last person of 1st slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T13:15"),
    location: "Baker Center, Room 230"
  });
});

test("1st person of 2nd slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T13:15"),
    location: "Baker Center, Room 239"
  });
});

test("2nd person of 2nd slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity + 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T13:15"),
    location: "Baker Center, Room 239"
  });
});

test("1st person of 3rd slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity * 2
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T14:30"),
    location: "Baker Center, Room 230"
  });
});

test("1st person of 4th slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity * 3
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T14:30"),
    location: "Baker Center, Room 239"
  });
});

test("calculate slots, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  t.deepEqual(registration.slots, [
    {
      time: AthensDateTime.create("2005-03-01T14:00"),
      capacity: 5
    },
    {
      time: AthensDateTime.create("2005-03-02T16:00"),
      capacity: 3
    },
    {
      time: AthensDateTime.create("2005-03-02T18:00"),
      capacity: 10
    }
  ]);
});

test("get max occupants in day, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  t.is(
    registration.getMaxOccupantsInDay(AthensDateTime.create("2005-03-01")),
    5
  );
  // t.is(registration.getMaxOccupantsInDay(AthensDateTime.create("2005-03-02")), 13);
});

test("1st person, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-01T14:00")
  });
});

test("2nd person, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(AthensDateTime.create("2005-03-01"), 1);
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-01T14:00")
  });
});

test("last person of 1st slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    AthensDateTime.create("2005-03-01"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-01T14:00")
  });
});

test("1st person of 2nd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    AthensDateTime.create("2005-03-01"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-02T16:00")
  });
});

test("2nd person of 2nd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    AthensDateTime.create("2005-03-01"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(AthensDateTime.create("2005-03-02"), 1);
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-02T16:00")
  });
});

test("last person of 2nd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    AthensDateTime.create("2005-03-01"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(
    AthensDateTime.create("2005-03-02"),
    t.context.configs.differentCapacityPerSlot.slotRanges[1].slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-02T16:00")
  });
});

test("1st person of 3rd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    AthensDateTime.create("2005-03-01"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(
    AthensDateTime.create("2005-03-02"),
    t.context.configs.differentCapacityPerSlot.slotRanges[1].slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-02T18:00")
  });
});

test("last person, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    AthensDateTime.create("2005-03-01"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(
    AthensDateTime.create("2005-03-02"),
    t.context.configs.differentCapacityPerSlot.slotRanges[1].slotCapacity +
      t.context.configs.differentCapacityPerSlot.slotCapacity -
      1
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2005-03-02T18:00")
  });
});

test("1st person overflow", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-17"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-17"))
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:00"),
    location: "Library"
  });
});

test("2nd person overflow", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15")) + 1
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-17"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-17"))
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:15"),
    location: "Library"
  });
});

test("1st person in 2nd day, overflow", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15")) +
      registration.countSlotsInDay(AthensDateTime.create("2018-08-15"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-17"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-17"))
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-16T09:00"),
    location: "Auditorium"
  });
});

test("last person of 1st overflow", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15")) +
      registration.countSlotsInDay(AthensDateTime.create("2018-08-15"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16")) +
      registration.countSlotsInDay(AthensDateTime.create("2018-08-16"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-17"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-17")) +
      registration.countSlotsInDay(AthensDateTime.create("2018-08-17")) -
      1
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-17T11:45")
  });
});

test("1st person, 2nd overflow", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-15")) +
      registration.countSlotsInDay(AthensDateTime.create("2018-08-15"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-16")) +
      registration.countSlotsInDay(AthensDateTime.create("2018-08-16"))
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-17"),
    registration.getMaxOccupantsInDay(AthensDateTime.create("2018-08-17")) +
      registration.countSlotsInDay(AthensDateTime.create("2018-08-17"))
  );

  t.deepEqual(registration.register(), {
    time: AthensDateTime.create("2018-08-15T09:00"),
    location: "Library"
  });
});

test("test calculate slots with break", t => {
  var registration = new SlotRegistration(t.context.configs.break);

  t.deepEqual(registration.slots, [
    {
      time: AthensDateTime.create("2005-01-05T08:00"),
      capacity: 10
    },
    {
      time: AthensDateTime.create("2005-01-05T09:00"),
      capacity: 10
    },
    {
      time: AthensDateTime.create("2005-01-05T10:00"),
      capacity: 10
    }
  ])
});
