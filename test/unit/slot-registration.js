import test from "ava";
import SlotRegistration from "../../src/slot-registration.js";

test.before(t => {
  t.context.configs = {
    rich: {
      slotRanges: [
        {
          time: {
            start: new Date("8/15/2018 9:00 AM"),
            end: new Date("8/15/2018 12:00 PM")
          },
          location: "Library"
        },
        {
          time: {
            start: new Date("8/15/2018 1:00 PM"),
            end: new Date("8/15/2018 4:00 PM")
          }
        },
        {
          time: {
            start: new Date("8/16/2018 9:00 AM"),
            end: new Date("8/16/2018 12:00 PM")
          },
          location: "Auditorium"
        },
        {
          time: {
            start: new Date("8/17/2018 11:00 AM"),
            end: new Date("8/17/2018 12:00 PM")
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
            start: new Date("8/15/2018 09:00 AM"),
            end: new Date("8/15/2018 12:00 PM")
          }
        },
        {
          time: {
            start: new Date("8/15/2018 1:00 PM"),
            end: new Date("8/15/2018 4:00 PM")
          }
        },
        {
          time: {
            start: new Date("8/16/2018 9:00 AM"),
            end: new Date("8/16/2018 12:00 PM")
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
            start: new Date("8/16/2018 1:15 PM"),
            end: new Date("8/16/2018 2:30 PM")
          },
          location: "Baker Center, Room 230"
        },
        {
          time: {
            start: new Date("8/16/2018 1:15 PM"),
            end: new Date("8/16/2018 2:30 PM")
          },
          location: "Baker Center, Room 239"
        },
        {
          time: {
            start: new Date("8/16/2018 2:30 PM"),
            end: new Date("8/16/2018 3:45 PM")
          },
          location: "Baker Center, Room 230"
        },
        {
          time: {
            start: new Date("8/16/2018 2:30 PM"),
            end: new Date("8/16/2018 3:45 PM")
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
            start: new Date("3/1/2005 2:00 PM"),
            end: new Date("3/1/2005 3:00 PM")
          },
          slotCapacity: 5
        },
        {
          time: {
            start: new Date("3/2/2005 4:00 PM"),
            end: new Date("3/2/2005 5:00 PM")
          },
          slotCapacity: 3
        },
        {
          time: {
            start: new Date("3/2/2005 6:00 PM"),
            end: new Date("3/2/2005 7:00 PM")
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
            start: new Date("9/12/2001 10:00 AM"),
            end: new Date("9/12/2001 11:00 AM")
          }
        }
      ],
      slotLength: 15,
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
      time: new Date("9/12/2001 10:00 AM"),
      location: "Toilet"
    }
  ]);
  t.deepEqual(registration.slots, [
    {
      time: new Date("9/12/2001 10:00 AM"),
      location: "Toilet"
    }
  ]);
  // make sure `setDefaultOccupancies()` runs
  t.deepEqual(registration.occupancies, [
    {
      date: new Date("9/12/2001"),
      count: 0
    }
  ]);
})

test("calculate slots", t => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: new Date("9/12/2001 10:00 AM"),
          end: new Date("9/12/2001 11:00 AM")
        },
        location: "Library"
      },
      {
        time: {
          start: new Date("9/15/2001 5:00 PM"),
          end: new Date("9/15/2001 6:00 PM")
        }
      }
    ],
    slotLength: 30,
    slotCapacity: 10
  });

  t.deepEqual(registration.slots, [
    {
      time: new Date("9/12/2001 10:00 AM"),
      location: "Library",
      capacity: 10
    },
    {
      time: new Date("9/12/2001 10:30 AM"),
      location: "Library",
      capacity: 10
    },
    {
      time: new Date("9/15/2001 5:00 PM"),
      capacity: 10
    },
    {
      time: new Date("9/15/2001 5:30 PM"),
      capacity: 10
    }
  ]);
});

test("get unique dates in slots", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.deepEqual(registration.getUniqueDatesInSlots(), [
    new Date("8/15/2018"),
    new Date("8/16/2018")
  ]);
});

test("set default occupancies", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.deepEqual(registration.occupancies, [
    {
      date: new Date("8/15/2018"),
      count: 0
    },
    {
      date: new Date("8/16/2018"),
      count: 0
    }
  ]);
});

test("set occupancy", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  registration.setOccupancy(new Date("8/15/2018"), 15);
  registration.setOccupancy(new Date("8/16/2018"), 30);

  t.deepEqual(registration.occupancies, [
    {
      date: new Date("8/15/2018"),
      count: 15
    },
    {
      date: new Date("8/16/2018"),
      count: 30
    }
  ]);

  t.throws(
    () => {
      registration.setOccupancy(new Date("5/2/2000"), 0);
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );
});

test("count occupants in day", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  registration.setOccupancy(new Date("8/15/2018"), 15);
  t.is(registration.countOccupantsInDay(new Date("8/15/2018")), 15);

  t.throws(
    () => {
      registration.countOccupantsInDay(new Date("5/2/2000"));
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );
});

test("set arrival date", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  registration.setArrivalDate(new Date("8/16/2018"));
  t.deepEqual(registration.arrivalDate, new Date("8/16/2018"));
});

test("get max occupants in day", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.is(registration.getMaxOccupantsInDay(new Date("8/15/2018")), 240);
  t.is(registration.getMaxOccupantsInDay(new Date("8/16/2018")), 120);

  t.throws(
    () => {
      registration.getMaxOccupantsInDay(new Date("5/2/2018"));
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );
});

test("is day full", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.is(registration.isDayFull(new Date("8/15/2018")), false);

  registration.setOccupancy(
    new Date("8/15/2018"),
    registration.getMaxOccupantsInDay(new Date("8/15/2018"))
  );
  t.is(registration.isDayFull(new Date("8/15/2018")), true);

  t.throws(
    () => {
      registration.isDayFull(new Date("5/2/2000"));
    },
    {
      instanceOf: RangeError,
      message: "Date does not exist in time range"
    }
  );

  registration.occupancies.unshift({ date: new Date("5/2/2000"), count: 5 });
  t.throws(
    () => {
      registration.isDayFull(new Date("5/2/2000"));
    },
    {
      instanceOf: RangeError,
      message: "Date in occupancies does not exist in time range"
    }
  );
});

test("get first available slot", t => {
  var registration = new SlotRegistration(t.context.configs.actual);

  t.deepEqual(registration.getFirstAvailableSlot(), {
    time: new Date("8/15/2018 9:00 AM")
  });
});

test("1st person", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  t.deepEqual(registration.register(), {
    time: new Date("8/15/2018 9:00 AM"),
    location: "Library"
  });
});

test("2nd person", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(new Date("8/15/2018"), 1);
  t.deepEqual(registration.register(), {
    time: new Date("8/15/2018 9:00 AM"),
    location: "Library"
  });
});

test("last person in 1st slot", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    new Date("8/15/2018"),
    t.context.configs.rich.slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/15/2018 9:00 AM"),
    location: "Library"
  });
});

test("1st person in 2nd slot", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    new Date("8/15/2018"),
    t.context.configs.rich.slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/15/2018 9:15 AM"),
    location: "Library"
  });
});

test("last person of 1st day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    new Date("8/15/2018"),
    // 12 is the number of slots in the range of 9:00 AM - 12:00 PM as well as
    // 1:00 PM - 4:00 PM
    registration.getMaxOccupantsInDay(new Date("8/15/2018")) - 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/15/2018 3:45 PM")
  });
});

test("1st person of 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    new Date("8/15/2018"),
    registration.getMaxOccupantsInDay(new Date("8/15/2018"))
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 9:00 AM"),
    location: "Auditorium"
  });
});

test("2nd person of 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    new Date("8/15/2018"),
    registration.getMaxOccupantsInDay(new Date("8/15/2018"))
  );
  registration.setOccupancy(new Date("8/16/2018"), 1);
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 9:00 AM"),
    location: "Auditorium"
  });
});

test("last person", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    new Date("8/15/2018"),
    registration.getMaxOccupantsInDay(new Date("8/15/2018"))
  );
  registration.setOccupancy(
    new Date("8/16/2018"),
    registration.getMaxOccupantsInDay(new Date("8/16/2018"))
  );
  registration.setOccupancy(
    new Date("8/17/2018"),
    registration.getMaxOccupantsInDay(new Date("8/17/2018")) - 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/17/2018 11:45 AM")
  });
});

test("1st person arriving on 1st day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setArrivalDate(new Date("8/15/2018"));
  // People are only registered into slots at least one day after they arrive
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 9:00 AM"),
    location: "Auditorium"
  });
});

test("2nd person arriving on 1st day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(new Date("8/16/2018"), 1);
  registration.setArrivalDate(new Date("8/15/2018"));
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 9:00 AM"),
    location: "Auditorium"
  });
});

test("1st person on 1st day with 1 person already on 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(new Date("8/16/2018"), 1);
  t.deepEqual(registration.register(), {
    time: new Date("8/15/2018 9:00 AM"),
    location: "Library"
  });
});

test("last person of 1st day with 1 person already on 2nd day", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(new Date("8/16/2018"), 1);
  registration.setOccupancy(
    new Date("8/15/2018"),
    registration.getMaxOccupantsInDay(new Date("8/15/2018")) - 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/15/2018 3:45 PM")
  });
});

test(
  "1st person of new slot on 2nd day arriving on 1st day, 1 person already" +
    " on 1st day",
  t => {
    var registration = new SlotRegistration(t.context.configs.rich);

    registration.setOccupancy(new Date("8/15/2018"), 1);
    registration.setOccupancy(
      new Date("8/16/2018"),
      t.context.configs.rich.slotCapacity
    );
    registration.setArrivalDate(new Date("8/15/2018"));
    t.deepEqual(registration.register(), {
      time: new Date("8/16/2018 9:15 AM"),
      location: "Auditorium"
    });
  }
);

test("1st person arriving on 1st day, 1st day already full", t => {
  var registration = new SlotRegistration(t.context.configs.rich);

  registration.setOccupancy(
    new Date("8/15/2018"),
    registration.getMaxOccupantsInDay(new Date("8/15/2018"))
  );
  registration.setArrivalDate(new Date("8/15/2018"));
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 9:00 AM"),
    location: "Auditorium"
  });
});

test("calculate slots, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  t.deepEqual(registration.slots, [
    {
      time: new Date("8/16/2018 1:15 PM"),
      location: "Baker Center, Room 230",
      capacity: 10
    },
    {
      time: new Date("8/16/2018 1:15 PM"),
      location: "Baker Center, Room 239",
      capacity: 10
    },
    {
      time: new Date("8/16/2018 2:30 PM"),
      location: "Baker Center, Room 230",
      capacity: 10
    },
    {
      time: new Date("8/16/2018 2:30 PM"),
      location: "Baker Center, Room 239",
      capacity: 10
    }
  ]);
});

test("set occupancy, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(new Date("8/16/2018"), 5);
  t.deepEqual(registration.occupancies, [
    {
      date: new Date("8/16/2018"),
      count: 5
    }
  ]);
});

test("is day full, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  t.is(registration.isDayFull(new Date("8/16/2018")), false);

  registration.setOccupancy(
    new Date("8/16/2018"),
    registration.getMaxOccupantsInDay(new Date("8/16/2018"))
  );
  t.is(registration.isDayFull(new Date("8/16/2018")), true);
});

test("1st person, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 1:15 PM"),
    location: "Baker Center, Room 230"
  });
});

test("2nd person, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(new Date("8/16/2018"), 1);
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 1:15 PM"),
    location: "Baker Center, Room 230"
  });
});

test("last person of 1st slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    new Date("8/16/2018"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 1:15 PM"),
    location: "Baker Center, Room 230"
  });
});

test("1st person of 2nd slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    new Date("8/16/2018"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 1:15 PM"),
    location: "Baker Center, Room 239"
  });
});

test("2nd person of 2nd slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    new Date("8/16/2018"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity + 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 1:15 PM"),
    location: "Baker Center, Room 239"
  });
});

test("1st person of 3rd slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    new Date("8/16/2018"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity * 2
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 2:30 PM"),
    location: "Baker Center, Room 230"
  });
});

test("1st person of 4th slot, same times, different locations", t => {
  var registration = new SlotRegistration(
    t.context.configs.sameTimesDifferentLocations
  );

  registration.setOccupancy(
    new Date("8/16/2018"),
    t.context.configs.sameTimesDifferentLocations.slotCapacity * 3
  );
  t.deepEqual(registration.register(), {
    time: new Date("8/16/2018 2:30 PM"),
    location: "Baker Center, Room 239"
  });
});

test("calculate slots, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  t.deepEqual(registration.slots, [
    {
      time: new Date("3/1/2005 2:00 PM"),
      capacity: 5
    },
    {
      time: new Date("3/2/2005 4:00 PM"),
      capacity: 3
    },
    {
      time: new Date("3/2/2005 6:00 PM"),
      capacity: 10
    }
  ]);
});

test("get max occupants in day, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  t.is(registration.getMaxOccupantsInDay(new Date("3/1/2005")), 5);
  t.is(registration.getMaxOccupantsInDay(new Date("3/2/2005")), 13);
});

test("1st person, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  t.deepEqual(registration.register(), {
    time: new Date("3/1/2005 2:00 PM")
  });
});

test("2nd person, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(new Date("3/1/2005"), 1);
  t.deepEqual(registration.register(), {
    time: new Date("3/1/2005 2:00 PM")
  });
});

test("last person of 1st slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    new Date("3/1/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("3/1/2005 2:00 PM")
  });
});

test("1st person of 2nd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    new Date("3/1/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: new Date("3/2/2005 4:00 PM")
  });
});

test("2nd person of 2nd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    new Date("3/1/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(new Date("3/2/2005"), 1);
  t.deepEqual(registration.register(), {
    time: new Date("3/2/2005 4:00 PM")
  });
});

test("last person of 2nd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    new Date("3/1/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(
    new Date("3/2/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[1].slotCapacity - 1
  );
  t.deepEqual(registration.register(), {
    time: new Date("3/2/2005 4:00 PM")
  });
});

test("1st person of 3rd slot, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    new Date("3/1/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(
    new Date("3/2/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[1].slotCapacity
  );
  t.deepEqual(registration.register(), {
    time: new Date("3/2/2005 6:00 PM")
  });
});

test("last person, different capacity per slot", t => {
  var registration = new SlotRegistration(
    t.context.configs.differentCapacityPerSlot
  );

  registration.setOccupancy(
    new Date("3/1/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[0].slotCapacity
  );
  registration.setOccupancy(
    new Date("3/2/2005"),
    t.context.configs.differentCapacityPerSlot.slotRanges[1].slotCapacity +
      t.context.configs.differentCapacityPerSlot.slotCapacity -
      1
  );

  t.deepEqual(registration.register(), {
    time: new Date("3/2/2005 6:00 PM")
  });
});
