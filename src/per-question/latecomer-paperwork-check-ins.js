import SlotRegistration from "slot-registration.js";
import DateToString from "date-to-string.js"

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: new Date("8/22/2018 3:00 PM"),
          end: new Date("8/22/2018 4:00 PM")
        }
      },
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  var amountRegistered822 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/22 Paperwork Check-in Quota Count"
  );
  registration.setOccupancy(new Date("8/22/2018"), amountRegistered822);

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
