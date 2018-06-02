import SlotRegistration from "slot-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: AthensDateTime.create("2018-08-15T09:00"),
          end: AthensDateTime.create("2018-08-16T00:00")
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
          end: AthensDateTime.create("2018-08-17T00:00")
        }
      }
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  var amountRegistered815 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/15 Paperwork Check-in Quota Count"
  );
  var amountRegistered816 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/16 Paperwork Check-in Quota Count"
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    amountRegistered815
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    amountRegistered816
  );

  var arrivalDate = Qualtrics.SurveyEngine.getEmbeddedData("Arrival Date");
  if (arrivalDate != "On Time") {
    var arrivalDate = AthensDateTime.create(arrivalDate);
  }
  registration.setArrivalDate(arrivalDate);

  var slot = registration.register();

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Paperwork Check-in Time",
    AthensDateTime.timeToString(slot.time)
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Paperwork Check-in Date",
    AthensDateTime.dateToString(slot.time)
  );
});
