import test from "ava";
import GroupRegistration from "../../src/group-registration.js";

test.before(t => {
  t.context.configs = {
    actual: {
      groups: [
        {
          events: {
            lawAndSafety: {
              time: {
                start: new Date("8/17/2018 9:00 AM"),
                end: new Date("8/17/2018 10:00 AM")
              },
              location: "Baker Center Theater"
            },
            healthInsurance: {
              time: {
                start: new Date("8/17/2018 10:15 AM"),
                end: new Date("8/17/2018 11:15 AM")
              },
              location: "Baker Center, Multipurpose Room"
            }
          }
        },
        {
          events: {
            lawAndSafety: {
              time: {
                start: new Date("8/17/2018 10:15 AM"),
                end: new Date("8/17/2018 11:15 AM")
              },
              location: "Baker Center Theater"
            },
            healthInsurance: {
              time: {
                start: new Date("8/17/2018 9:00 AM"),
                end: new Date("8/17/2018 10:00 AM")
              },
              location: "Baker Center, Multipurpose Room"
            }
          }
        }
      ]
    }
  };
  t.context.deepCloneConfig = (configName, configs = t.context.configs) => {
    var configClone = JSON.parse(JSON.stringify(configs[configName]));
    // Dates are not processed correctly with JSON deep clone
    for (var i = 0; i < configClone.groups.length; i++) {
      for (var eventName in configClone.groups[i].events) {
        configClone.groups[i].events[eventName].time.start = new Date(
          configClone.groups[i].events[eventName].time.start
        );
        configClone.groups[i].events[eventName].time.end = new Date(
          configClone.groups[i].events[eventName].time.end
        );
      }
    }
    return configClone;
  };
});

test("1st person", t => {
  var registration = new GroupRegistration(t.context.deepCloneConfig("actual"));
  t.deepEqual(registration.register(), {
    occupancy: 0,
    events: {
      lawAndSafety: {
        time: {
          start: new Date("8/17/2018 9:00 AM"),
          end: new Date("8/17/2018 10:00 AM")
        },
        location: "Baker Center Theater"
      },
      healthInsurance: {
        time: {
          start: new Date("8/17/2018 10:15 AM"),
          end: new Date("8/17/2018 11:15 AM")
        },
        location: "Baker Center, Multipurpose Room"
      }
    }
  });
});

test("2nd person", t => {
  var registration = new GroupRegistration(t.context.deepCloneConfig("actual"));
  registration.setOccupancy(1, 1);
  t.deepEqual(registration.register(), {
    occupancy: 0,
    events: {
      lawAndSafety: {
        time: {
          start: new Date("8/17/2018 10:15 AM"),
          end: new Date("8/17/2018 11:15 AM")
        },
        location: "Baker Center Theater"
      },
      healthInsurance: {
        time: {
          start: new Date("8/17/2018 9:00 AM"),
          end: new Date("8/17/2018 10:00 AM")
        },
        location: "Baker Center, Multipurpose Room"
      }
    }
  });
});

test("3rd person", t => {
  var registration = new GroupRegistration(t.context.deepCloneConfig("actual"));
  registration.setOccupancy(1, 1);
  registration.setOccupancy(2, 1);
  t.deepEqual(registration.register(), {
    occupancy: 1,
    events: {
      lawAndSafety: {
        time: {
          start: new Date("8/17/2018 9:00 AM"),
          end: new Date("8/17/2018 10:00 AM")
        },
        location: "Baker Center Theater"
      },
      healthInsurance: {
        time: {
          start: new Date("8/17/2018 10:15 AM"),
          end: new Date("8/17/2018 11:15 AM")
        },
        location: "Baker Center, Multipurpose Room"
      }
    }
  });
});

test("3rd person, 2 already in group 0", t => {
  var registration = new GroupRegistration(t.context.deepCloneConfig("actual"));
  registration.setOccupancy(1, 2);
  t.deepEqual(registration.register(), {
    occupancy: 0,
    events: {
      lawAndSafety: {
        time: {
          start: new Date("8/17/2018 10:15 AM"),
          end: new Date("8/17/2018 11:15 AM")
        },
        location: "Baker Center Theater"
      },
      healthInsurance: {
        time: {
          start: new Date("8/17/2018 9:00 AM"),
          end: new Date("8/17/2018 10:00 AM")
        },
        location: "Baker Center, Multipurpose Room"
      }
    }
  });
});
