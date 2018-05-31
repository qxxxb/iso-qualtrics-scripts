import GroupRegistration from "group-registration.js";
import TimeRangeToString from "time-range-to-string.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new GroupRegistration({
    groups: [
      {
        events: {
          academicSuccess: {
            time: {
              start: new Date("8/14/2018 2:00 PM"),
              end: new Date("8/14/2018 3:00 PM")
            },
            location: "Baker Center Theater"
          },
          titleIX: {
            time: {
              start: new Date("8/14/2018 3:00 PM"),
              end: new Date("8/14/2018 4:00 PM")
            },
            location: "Baker Center, Multipurpose Room"
          }
        }
      },
      {
        events: {
          titleIX: {
            time: {
              start: new Date("8/14/2018 2:00 PM"),
              end: new Date("8/14/2018 3:00 PM")
            },
            location: "Baker Center, Multipurpose Room"
          },
          academicSuccess: {
            time: {
              start: new Date("8/14/2018 3:00 PM"),
              end: new Date("8/14/2018 4:00 PM")
            },
            location: "Baker Center Theater"
          }
        }
      }
    ]
  });

  registration.setOccupancy(
    1,
    Qualtrics.SurveyEngine.getEmbeddedData(
      "Group 1 Academic Success and Title IX Quota Count"
    )
  );
  registration.setOccupancy(
    2,
    Qualtrics.SurveyEngine.getEmbeddedData(
      "Group 2 Academic Success and Title IX Quota Count"
    )
  );

  var groupToBeRegisteredIn = registration.register();
  var academicSuccessTimeRangeString = TimeRangeToString(
    groupToBeRegisteredIn.events.academicSuccess.time
  );
  var titleIXTimeRangeString = TimeRangeToString(
    groupToBeRegisteredIn.events.titleIX.time
  );

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Academic Success Time",
    academicSuccessTimeRangeString
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Title IX Time",
    titleIXTimeRangeString
  );
});
