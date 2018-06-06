import SlotRegistration from "slot-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var visaType = Qualtrics.SurveyEngine.getEmbeddedData("Visa Type");
  if (visaType == "J-1") {
    Qualtrics.SurveyEngine.setEmbeddedData(
      "Immigration Regulations Session Time",
      AthensDateTime.timeToString(AthensDateTime.create("2018-08-22T10:15"))
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "Immigration Regulations Session Date",
      AthensDateTime.dateToString(AthensDateTime.create("2018-08-22T10:15"))
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "Immigration Regulations Session Location",
      "Baker Center, 2nd Floor, Room 230"
    );
    return;
  }

  // let it slice the ranges into slots first
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: AthensDateTime.create("2018-08-22T09:00"),
          end: AthensDateTime.create("2018-08-22T11:15")
        }
      }
    ],
    slotLength: 60,
    breakLength: 15,
    slotCapacity: 0
  });

  // process the slots
  var newSlots = [];
  for (var i = 0; i < registration.slots.length; i++) {
    var originalSlot = registration.slots[i];
    var roomCapacities = [
      {
        room: 239,
        capacity: 24
      },
      {
        room: 231,
        capacity: 48
      },
      {
        room: 230,
        capacity: 28
      }
    ];
    for (var j = 0; j < roomCapacities.length; j++) {
      // deep clone
      var newSlot = JSON.parse(JSON.stringify(originalSlot));
      newSlot.location = "Baker Center, 2nd Floor, Room " + roomCapacities[j].room;
      newSlot.capacity = roomCapacities[j].capacity;
      newSlots.push(newSlot);
    }
  }
  // using JSON parse and stringify for deep cloning does not convert Dates
  // back to an object
  for (var i = 0; i < newSlots.length; i++) {
    newSlots[i].time = AthensDateTime.create(newSlots[i].time);
  }
  // reserve final slot for students with J-1 visas
  newSlots.pop();

  registration.setSlots(newSlots);

  var amountRegistered822 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/22 F-1 Immigration Regulations Session Quota Count"
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
    "Immigration Regulations Session Time",
    AthensDateTime.timeToString(slot.time)
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Immigration Regulations Session Date",
    AthensDateTime.dateToString(slot.time)
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Immigration Regulations Session Location",
    slot.location
  );
});
