import SlotRegistration from "slot-registration.js";
import DateToString from "date-to-string.js"

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: new Date("8/20/2018 2:00 PM"),
          end: new Date("8/20/2018 4:00 PM")
        }
      },
      {
        time: {
          start: new Date("8/21/2018 1:00 PM"),
          end: new Date("8/21/2018 5:00 PM")
        }
      },
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  var amountRegistered820 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/20 Paperwork Check-in Quota Count"
  );
  var amountRegistered821 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/21 Paperwork Check-in Quota Count"
  );
  registration.setOccupancy(new Date("8/20/2018"), amountRegistered820);
  registration.setOccupancy(new Date("8/21/2018"), amountRegistered821);

  var arrivalDate = Qualtrics.SurveyEngine.getEmbeddedData("Arrival Date");
  if (arrivalDate != "On Time") {
    var arrivalDate = new Date(arrivalDate);
  }
  registration.setArrivalDate(arrivalDate);

  var slot = registration.register();

  var slotTime = slot.time.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit"
  });
  var slotDate = DateToString(slot.time);

  Qualtrics.SurveyEngine.setEmbeddedData("Paperwork Check-in Time", slotTime);
  Qualtrics.SurveyEngine.setEmbeddedData("Paperwork Check-in Date", slotDate);
});
