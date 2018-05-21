Qualtrics.SurveyEngine.addOnload(() => {
  var mandatorySessionsMultipurposeRoom = Qualtrics.SurveyEngine.getEmbeddedData(
    "Multipurpose Room Mandatory Sessions Quota Count"
  );
  var mandatorySessionsTheater = Qualtrics.SurveyEngine.getEmbeddedData(
    "Theater Mandatory Sessions Quota Count"
  );

  if (mandatorySessionsMultipurposeRoom <= mandatorySessionsTheater) {
    var mandatorySessionLocation = "Baker Center, Multipurpose Room";
  } else {
    var mandatorySessionLocation = "Baker Center, Theater";
  }
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Mandatory Session Location",
    mandatorySessionLocation
  );
});
