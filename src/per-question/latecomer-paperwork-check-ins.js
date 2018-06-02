import SlotRegistration from "slot-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: AthensDateTime.create("2018-08-22T15:00"),
          end: AthensDateTime.create("2018-08-22T16:00")
        }
      }
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  var amountRegistered822 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/22 Paperwork Check-in Quota Count"
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-22"),
    amountRegistered822
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
