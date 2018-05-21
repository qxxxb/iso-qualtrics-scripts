Qualtrics.SurveyEngine.addOnload(() => {
  var maximumOccupancy = 35;

  var slots = [];
  slots.push({
    room: 129,
    occupants: Qualtrics.SurveyEngine.getEmbeddedData(
      "Room 129 Mandatory Sessions Quota Count"
    )
  });
  slots.push({
    room: 132,
    occupants: Qualtrics.SurveyEngine.getEmbeddedData(
      "Room 132 Mandatory Sessions Quota Count"
    )
  });
  slots.push({
    room: 135,
    occupants: Qualtrics.SurveyEngine.getEmbeddedData(
      "Room 135 Mandatory Sessions Quota Count"
    )
  });

  // in case all other slots get filled up
  var backupSlot = {
    room: 136,
    occupants: Qualtrics.SurveyEngine.getEmbeddedData(
      "Room 136 Mandatory Sessions Quota Count"
    )
  };

  var allSlotsAreFull = true;
  var lowestOccupancySlot = slots[0];
  for (var i = 1; i < slots.length; i++) {
    if (slots[i].occupants < maximumOccupancy) {
      allSlotsAreFull = false;
    }
    if (slots[i].occupants < lowestOccupancySlot.occupants) {
      lowestOccupancySlot = slots[i];
    }
  }

  var locationRoom = lowestOccupancySlot.room;

  if (allSlotsAreFull) {
    locationRoom = backupSlot.room;
  }

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Mandatory Session Location",
    "Baker Center, Room " + locationRoom
  );
});
