import SlotRegistration from "slot-registration.js";
import DateToString from "date-to-string.js"

Qualtrics.SurveyEngine.addOnload(() => {
  var visaType = Qualtrics.SurveyEngine.getEmbeddedData(
    "Visa Type"
  );
  if (visaType == "J-1") {
    Qualtrics.SurveyEngine.setEmbeddedData(
      "Immigration Regulations Session Time",
      "3:45 PM"
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "Immigration Regulations Session Date",
      "Friday, 8/17"
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "Immigration Regulations Session Location",
      "Baker Room, Room 230"
    );
    return;
  }

  // let it slice the ranges into slots first
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: new Date("8/16/2018 1:15 PM"),
          end: new Date("8/16/2018 3:45 PM")
        }
      },
      {
        time: {
          start: new Date("8/17/2018 1:15 PM"),
          end: new Date("8/17/2018 4:30 PM")
        }
      }
    ],
    slotLength: 75,
    slotCapacity: 0
  });

  // process the slots
  var newSlots = [];
  for (var i = 0; i < registration.slots.length; i++) {
    var originalSlot = registration.slots[i];
    var roomCapacities = [
      {
        room: 239,
        capacity: 20
      },
      {
        room: 231,
        capacity: 30
      },
      {
        room: 230,
        capacity: 25
      }
    ];
    for (var j = 0; j < roomCapacities.length; j++) {
      // deep clone
      var newSlot = JSON.parse(JSON.stringify(originalSlot));
      newSlot.location = "Baker Center, Room " + roomCapacities[j].room;
      newSlot.capacity = roomCapacities[j].capacity;
      newSlots.push(newSlot);
    }
  }
  // using JSON parse and stringify for deep cloning does not convert Dates
  // back to an object
  for (var i = 0; i < newSlots.length; i++) {
    newSlots[i].time = new Date(newSlots[i].time);
  }
  // reserve final slot for students with J-1 visas
  newSlots.pop();

  registration.setSlots(newSlots);

  var amountRegistered816 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/16 F-1 Immigration Regulations Session Quota Count"
  );
  var amountRegistered817 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/17 F-1 Immigration Regulations Session Quota Count"
  );
  registration.setOccupancy(new Date("8/16/2018"), amountRegistered816);
  registration.setOccupancy(new Date("8/17/2018"), amountRegistered817);

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
  var slotLocation = slot.location;

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Immigration Regulations Session Time",
    slotTime
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Immigration Regulations Session Date",
    slotDate
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Immigration Regulations Session Location",
    slotLocation
  );
});
