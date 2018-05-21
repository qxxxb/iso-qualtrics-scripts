Qualtrics.SurveyEngine.addOnPageSubmit(() => {
  var answer = jQuery(".InputText")[0].value;
  var arrivalDateArray = answer.split("/");
  Qualtrics.SurveyEngine.setEmbeddedData("Arrival Month", arrivalDateArray[0]);
  Qualtrics.SurveyEngine.setEmbeddedData("Arrival Day", arrivalDateArray[1]);
  Qualtrics.SurveyEngine.setEmbeddedData("Arrival Year", arrivalDateArray[2]);
})
