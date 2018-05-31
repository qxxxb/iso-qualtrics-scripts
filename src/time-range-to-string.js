export default (timeRange, config) => {
  if (config === undefined) {
    config = {
      locale: "en-US",
      format: {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit"
      },
      separator: "-"
    };
  }

  var startTimeString = timeRange.start.toLocaleTimeString(
    config.locale,
    config.format
  );
  var endTimeString = timeRange.end.toLocaleTimeString(
    config.locale,
    config.format
  );

  return startTimeString + " " + config.separator + " " + endTimeString;
};
