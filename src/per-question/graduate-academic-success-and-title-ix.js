import GroupRegistration from "group-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new GroupRegistration({
    groups: [
      {
        events: {
          academicSuccess: {
            time: {
              start: AthensDateTime.create("2018-08-14T14:00"),
              end: AthensDateTime.create("2018-08-14T15:00")
            },
          },
          titleIX: {
            time: {
              start: AthensDateTime.create("2018-08-14T15:00"),
              end: AthensDateTime.create("2018-08-14T16:00")
            },
          }
        }
      },
      {
        events: {
          titleIX: {
            time: {
              start: AthensDateTime.create("2018-08-14T14:00"),
              end: AthensDateTime.create("2018-08-14T15:00")
            },
          },
          academicSuccess: {
            time: {
              start: AthensDateTime.create("2018-08-14T15:00"),
              end: AthensDateTime.create("2018-08-14T16:00")
            },
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

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Academic Success Time",
    AthensDateTime.timeRangeToString(
      groupToBeRegisteredIn.events.academicSuccess.time.start,
      groupToBeRegisteredIn.events.academicSuccess.time.end
    )
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Title IX Time",
    AthensDateTime.timeRangeToString(
      groupToBeRegisteredIn.events.titleIX.time.start,
      groupToBeRegisteredIn.events.titleIX.time.end
    )
  );
});
