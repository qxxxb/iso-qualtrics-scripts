import GroupRegistration from "group-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new GroupRegistration({
    groups: [
      {
        events: {
          lawAndSafety: {
            time: {
              start: AthensDateTime.create("2018-08-17T09:00"),
              end: AthensDateTime.create("2018-08-17T10:00")
            },
            location: "Baker Center, 2nd Floor, Baker Theater"
          },
          healthInsurance: {
            time: {
              start: AthensDateTime.create("2018-08-17T10:15"),
              end: AthensDateTime.create("2018-08-17T11:15")
            },
            location: "Baker Center, 2nd Floor Multipurpose Room (240/242)"
          }
        }
      },
      {
        events: {
          lawAndSafety: {
            time: {
              start: AthensDateTime.create("2018-08-17T10:15"),
              end: AthensDateTime.create("2018-08-17T11:15")
            },
            location: "Baker Center, 2nd Floor, Baker Theater"
          },
          healthInsurance: {
            time: {
              start: AthensDateTime.create("2018-08-17T09:00"),
              end: AthensDateTime.create("2018-08-17T10:00")
            },
            location: "Baker Center, 2nd Floor Multipurpose Room (240/242)"
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

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Law and Safety Time",
    AthensDateTime.timeRangeToString(
      groupToBeRegisteredIn.events.lawAndSafety.time.start,
      groupToBeRegisteredIn.events.lawAndSafety.time.end
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
    "Health Insurance Location",
    groupToBeRegisteredIn.events.healthInsurance.location
  );
});
