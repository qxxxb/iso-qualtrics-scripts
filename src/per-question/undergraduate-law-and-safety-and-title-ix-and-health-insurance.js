import GroupRegistration from "group-registration.js";
import TimeRangeToString from "time-range-to-string.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new GroupRegistration({
    groups: [
      {
        events: {
          lawAndSafety: {
            time: {
              start: new Date("8/23/2018 8:00 AM"),
              end: new Date("8/23/2018 9:00 AM")
            },
            location: "Bentley Hall 129"
          },
          titleIX: {
            time: {
              start: new Date("8/23/2018 9:15 AM"),
              end: new Date("8/23/2018 10:15 AM")
            },
            location: "Bentley Hall 132"
          },
          healthInsurance: {
            time: {
              start: new Date("8/23/2018 10:30 AM"),
              end: new Date("8/23/2018 11:30 AM")
            },
            location: "Bentley Hall 135"
          }
        }
      },
      {
        events: {
          healthInsurance: {
            time: {
              start: new Date("8/23/2018 8:00 AM"),
              end: new Date("8/23/2018 9:00 AM")
            },
            location: "Bentley Hall 135"
          },
          lawAndSafety: {
            time: {
              start: new Date("8/23/2018 9:15 AM"),
              end: new Date("8/23/2018 10:15 AM")
            },
            location: "Bentley Hall 129"
          },
          titleIX: {
            time: {
              start: new Date("8/23/2018 10:30 AM"),
              end: new Date("8/23/2018 11:30 AM")
            },
            location: "Bentley Hall 132"
          },
        }
      },
      {
        events: {
          titleIX: {
            time: {
              start: new Date("8/23/2018 8:00 AM"),
              end: new Date("8/23/2018 9:00 AM")
            },
            location: "Bentley Hall 132"
          },
          healthInsurance: {
            time: {
              start: new Date("8/23/2018 9:15 AM"),
              end: new Date("8/23/2018 10:15 AM")
            },
            location: "Bentley Hall 135"
          },
          lawAndSafety: {
            time: {
              start: new Date("8/23/2018 10:30 AM"),
              end: new Date("8/23/2018 11:30 AM")
            },
            location: "Bentley Hall 129"
          },
        }
      },
    ]
  });

  registration.setOccupancy(
    1,
    Qualtrics.SurveyEngine.getEmbeddedData(
      "Group 1 Law and Safety and Title IX and Health Insurance Quota Count"
    )
  );
  registration.setOccupancy(
    2,
    Qualtrics.SurveyEngine.getEmbeddedData(
      "Group 2 Law and Safety and Title IX and Health Insurance Quota Count"
    )
  );
  registration.setOccupancy(
    3,
    Qualtrics.SurveyEngine.getEmbeddedData(
      "Group 3 Law and Safety and Title IX and Health Insurance Quota Count"
    )
  );

  var groupToBeRegisteredIn = registration.register();
  var lawAndSafetyTimeRangeString = TimeRangeToString(
    groupToBeRegisteredIn.events.lawAndSafety.time
  );
  var titleIXTimeRangeString = TimeRangeToString(
    groupToBeRegisteredIn.events.titleIX.time
  );
  var healthInsuranceTimeRangeString = TimeRangeToString(
    groupToBeRegisteredIn.events.healthInsurance.time
  );

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Law and Safety Time",
    lawAndSafetyTimeRangeString
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Title IX Time",
    titleIXTimeRangeString
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Health Insurance Time",
    healthInsuranceTimeRangeString
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Law and Safety Location",
    groupToBeRegisteredIn.events.lawAndSafety.location
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Title IX Location",
    groupToBeRegisteredIn.events.titleIX.location
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Health Insurance Location",
    groupToBeRegisteredIn.events.healthInsurance.location
  );
});
