import GroupRegistration from "group-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new GroupRegistration({
    groups: [
      {
        events: {
          lawAndSafety: {
            time: {
              start: AthensDateTime.create("2018-08-23T08:00"),
              end: AthensDateTime.create("2018-08-23T09:00")
            },
            location: "Bentley Hall 129"
          },
          titleIX: {
            time: {
              start: AthensDateTime.create("2018-08-23T09:15"),
              end: AthensDateTime.create("2018-08-23T10:15")
            },
            location: "Bentley Hall 132"
          },
          healthInsurance: {
            time: {
              start: AthensDateTime.create("2018-08-23T10:30"),
              end: AthensDateTime.create("2018-08-23T11:30")
            },
            location: "Bentley Hall 135"
          }
        }
      },
      {
        events: {
          healthInsurance: {
            time: {
              start: AthensDateTime.create("2018-08-23T08:00"),
              end: AthensDateTime.create("2018-08-23T09:00")
            },
            location: "Bentley Hall 135"
          },
          lawAndSafety: {
            time: {
              start: AthensDateTime.create("2018-08-23T09:15"),
              end: AthensDateTime.create("2018-08-23T10:15")
            },
            location: "Bentley Hall 129"
          },
          titleIX: {
            time: {
              start: AthensDateTime.create("2018-08-23T10:30"),
              end: AthensDateTime.create("2018-08-23T11:30")
            },
            location: "Bentley Hall 132"
          }
        }
      },
      {
        events: {
          titleIX: {
            time: {
              start: AthensDateTime.create("2018-08-23T08:00"),
              end: AthensDateTime.create("2018-08-23T09:00")
            },
            location: "Bentley Hall 132"
          },
          healthInsurance: {
            time: {
              start: AthensDateTime.create("2018-08-23T09:15"),
              end: AthensDateTime.create("2018-08-23T10:15")
            },
            location: "Bentley Hall 135"
          },
          lawAndSafety: {
            time: {
              start: AthensDateTime.create("2018-08-23T10:30"),
              end: AthensDateTime.create("2018-08-23T11:30")
            },
            location: "Bentley Hall 129"
          }
        }
      }
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

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Law and Safety Time",
    AthensDateTime.timeRangeToString(
      groupToBeRegisteredIn.events.lawAndSafety.time.start,
      groupToBeRegisteredIn.events.lawAndSafety.time.end
    )
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Title IX Time",
    AthensDateTime.timeRangeToString(
      groupToBeRegisteredIn.events.titleIX.time.start,
      groupToBeRegisteredIn.events.titleIX.time.end
    )
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Health Insurance Time",
    AthensDateTime.timeRangeToString(
      groupToBeRegisteredIn.events.healthInsurance.time.start,
      groupToBeRegisteredIn.events.healthInsurance.time.end
    )
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
