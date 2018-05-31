import GroupRegistration from "group-registration.js";
import TimeRangeToString from "time-range-to-string.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new GroupRegistration({
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
  });

  registration.setOccupancy(
    1,
    Qualtrics.SurveyEngine.getEmbeddedData(
      "Group 1 Law and Safety and Health Insurance Quota Count"
    )
  );
  registration.setOccupancy(
    2,
    Qualtrics.SurveyEngine.getEmbeddedData(
      "Group 2 Law and Safety and Health Insurance Quota Count"
    )
  );

  var groupToBeRegisteredIn = registration.register();
  var lawAndSafetyTimeRangeString = TimeRangeToString(
    groupToBeRegisteredIn.events.lawAndSafety.time
  );
  var healthInsuranceTimeRangeString = TimeRangeToString(
    groupToBeRegisteredIn.events.healthInsurance.time
  );

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Law and Safety Time",
    lawAndSafetyTimeRangeString
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
    "Health Insurance Location",
    groupToBeRegisteredIn.events.healthInsurance.location
  );
});
