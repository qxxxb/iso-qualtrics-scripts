Qualtrics.SurveyEngine.addOnload(() => {
  var runJavaScriptFor = Qualtrics.SurveyEngine.getEmbeddedData(
    "Run JavaScript For"
  );
  switch (runJavaScriptFor) {
    case "Graduate Academic Success":
      var graduateAcademicSuccess2PM = Qualtrics.SurveyEngine.getEmbeddedData(
        "2 PM Graduate Academic Success Quota Count"
      );
      var titleIX2PM = Qualtrics.SurveyEngine.getEmbeddedData(
        "2 PM Title IX Quota Count"
      );

      if (graduateAcademicSuccess2PM <= titleIX2PM) {
        var graduateAcademicSuccessTime = "2:00 PM - 3:00 PM";
        var titleIXTime = "3:00 PM - 4:00 PM";
      } else {
        var titleIXTime = "2:00 PM - 3:00 PM";
        var graduateAcademicSuccessTime = "3:00 PM - 4:00 PM";
      }
      Qualtrics.SurveyEngine.setEmbeddedData(
        "Graduate Academic Success Time",
        graduateAcademicSuccessTime
      );
      Qualtrics.SurveyEngine.setEmbeddedData("Title IX Time", titleIXTime);
      break;
  }
});
