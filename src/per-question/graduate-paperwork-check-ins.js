import SlotRegistration from "slot-registration.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: new Date("8/15/2018 09:00 AM"),
          end: new Date("8/15/2018 12:00 PM")
        }
      },
      {
        time: {
          start: new Date("8/15/2018 1:00 PM"),
          end: new Date("8/15/2018 4:00 PM")
        }
      },
      {
        time: {
          start: new Date("8/16/2018 9:00 AM"),
          end: new Date("8/16/2018 12:00 PM")
        }
      }
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  var amountRegistered815 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/15 Paperwork Check-ins Quota Count"
  );
  var amountRegistered816 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/16 Paperwork Check-ins Quota Count"
  );
  registration.setOccupancy(new Date("8/15/2018"), amountRegistered815);
  registration.setOccupancy(new Date("8/16/2018"), amountRegistered816);

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
  var slotDate = slot.time.toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    month: "numeric",
    day: "numeric"
  });
  Qualtrics.SurveyEngine.setEmbeddedData("Paperwork Check-in Time", slotTime);
  Qualtrics.SurveyEngine.setEmbeddedData("Paperwork Check-in Date", slotDate);
});
