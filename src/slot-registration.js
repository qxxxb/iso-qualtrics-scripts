export default class SlotRegistration {
  constructor(config) {
    // TODO: config validation

    this.slotLength = config.slotLength;

    this.slots = [];
    this.occupancies = [];
    this.arrivalDate = "On Time";

    this.calculateSlots(config);
    this.setDefaultOccupancies();
  }

  // create array of time slots based on time ranges
  calculateSlots(config) {
    this.slots = [];
    for (var i = 0; i < config.slotRanges.length; i++) {
      var startTime = config.slotRanges[i].time.start;
      var endTime = config.slotRanges[i].time.end;

      var slotTimeStart = startTime;

      while (slotTimeStart < endTime) {
        // push the slot
        var slot = {
          time: slotTimeStart
        };
        if ("location" in config.slotRanges[i]) {
          slot.location = config.slotRanges[i].location;
        }
        if ("slotCapacity" in config.slotRanges[i]) {
          slot.capacity = config.slotRanges[i].slotCapacity;
        } else if ("slotCapacity" in config) {
          slot.capacity = config.slotCapacity;
        } else {
          throw "Missing capacity for slot";
        }
        this.slots.push(slot);

        // calculate the next slot
        // 60000 milliseconds in a minute
        slotTimeStart = new Date(
          slotTimeStart.getTime() + this.slotLength * 60000
        );
      }
    }
  }

  setSlots(slots) {
    this.slots = slots;
    this.setDefaultOccupancies();
  }

  getUniqueDatesInSlots() {
    var dates = [];
    for (var i = 0; i < this.slots.length; i++) {
      if (
        dates.length == 0 ||
        ((dates, testDate) => {
          for (var j = 0; j < dates.length; j++) {
            if (testDate.toDateString() == dates[j].toDateString()) {
              return false;
            }
          }
          return true;
        })(dates, this.slots[i].time)
      ) {
        dates.push(new Date(this.slots[i].time.toLocaleDateString()));
      }
    }
    return dates;
  }

  setDefaultOccupancies() {
    this.occupancies = [];
    var uniqueDates = this.getUniqueDatesInSlots();
    for (var i = 0; i < uniqueDates.length; i++) {
      this.occupancies.push({ date: uniqueDates[i], count: 0 });
    }
  }

  // set the number of people already registered into the slots of a day
  setOccupancy(slotsDate, count) {
    // because of `setDefaultOccupancies()`, which initializes all possible
    // occupancies to 0, a previous entry must exist in order for it to be a
    // valid occupancy
    var previousEntryExists = false;
    for (var i = 0; i < this.occupancies.length; i++) {
      if (this.occupancies[i].date.toDateString() == slotsDate.toDateString()) {
        this.occupancies[i].count = count;
        return;
      }
    }
    throw new RangeError("Date does not exist in time range");
  }

  countOccupantsInDay(date) {
    for (var i = 0; i < this.occupancies.length; i++) {
      if (this.occupancies[i].date.toDateString() == date.toDateString()) {
        return this.occupancies[i].count;
      }
    }
    throw new RangeError("Date does not exist in time range");
  }

  setArrivalDate(arrivalDate) {
    this.arrivalDate = arrivalDate;
  }

  getMaxOccupantsInDay(date) {
    var maxOccupants = 0;
    var dayExistsInSlots = false;
    for (var i = 0; i < this.slots.length; i++) {
      if (this.slots[i].time.toDateString() == date.toDateString()) {
        dayExistsInSlots = true;
        maxOccupants += this.slots[i].capacity;
      }
    }
    if (!dayExistsInSlots) {
      throw new RangeError("Date does not exist in time range");
    }
    return maxOccupants;
  }

  isDayFull(date) {
    for (var i = 0; i < this.occupancies.length; i++) {
      if (this.occupancies[i].date.toDateString() == date.toDateString()) {
        try {
          var maxOccupants = this.getMaxOccupantsInDay(date);
        } catch (e) {
          throw new RangeError(
            "Date in occupancies does not exist in time range"
          );
        }
        if (this.occupancies[i].count >= maxOccupants) {
          return true;
        }
        return false;
      }
    }
    throw new RangeError("Date does not exist in time range");
  }

  calculateOverflowLayers(date) {
    return Math.floor(
      (this.countOccupantsInDay(date) - this.getMaxOccupantsInDay(date)) /
        this.countSlotsInDay(date)
    );
  }

  getOccupancyWithLeastOverflowLayersAfterArrivalDate() {
    var lowestOccupancy = this.occupancies[0];
    var leastOverflow = this.calculateOverflowLayers(this.occupancies[0].date);
    for (var i = 1; i < this.occupancies.length; i++) {
      if (
        this.arrivalDate != "On Time" &&
        this.occupancies[i].date < this.arrivalDate
      ) {
        continue;
      }

      var overflow = this.calculateOverflowLayers(this.occupancies[i].date);
      if (overflow < leastOverflow) {
        leastOverflow = overflow;
        lowestOccupancy = this.occupancies[i];
      }
    }
    return lowestOccupancy;
  }

  countSlotsInDay(date) {
    var amountOfSlots = 0;
    for (var i = 0; i < this.slots.length; i++) {
      if (this.slots[i].time.toDateString() == date.toDateString()) {
        amountOfSlots++;
      }
    }
    return amountOfSlots;
  }

  getIndexOfDayInSlots(date) {
    for (var i = 0; i < this.slots.length; i++) {
      if (this.slots[i].time.toDateString() == date.toDateString()) {
        return i;
      }
    }
  }

  getFirstAvailableSlot() {
    var allAvailableDaysAreFull = true;
    for (var i = 0; i < this.occupancies.length; i++) {
      // assume that they are only available the day after they arrive
      if (this.occupancies[i].date <= this.arrivalDate) {
        continue;
      }
      if (this.isDayFull(this.occupancies[i].date)) {
        continue;
      }
      allAvailableDaysAreFull = false;
      // now that we know the day is not full, we need to get the first
      // available slot
      var firstAvailableDay = this.occupancies[i].date;
      var occupantsInDay = this.countOccupantsInDay(this.occupancies[i].date);
      // the index in `this.slots` where the available day's slots begin
      var dayOffset = null;
      // the offset of the index of the correct slot in the slots of the
      // available day
      var slotOffset = 0;
      // the number of spaces still occupied after filling up each slot capacity
      var remainder = occupantsInDay;
      for (var i = 0; i < this.slots.length; i++) {
        if (
          this.slots[i].time.toDateString() == firstAvailableDay.toDateString()
        ) {
          if (dayOffset == null) {
            dayOffset = i;
          }
          remainder = remainder - this.slots[i].capacity;
          if (remainder < 0) {
            break;
          }
          slotOffset++;
        }
      }
      var sessionNumber = slotOffset + dayOffset;
      break;
    }
    if (allAvailableDaysAreFull) {
      var lowestOccupancy = this.getOccupancyWithLeastOverflowLayersAfterArrivalDate();
      var slotsInLeastOccupiedDay = this.countSlotsInDay(lowestOccupancy.date);
      var slotOffset = lowestOccupancy.count % slotsInLeastOccupiedDay;
      var dayOffset = this.getIndexOfDayInSlots(lowestOccupancy.date);
      var sessionNumber = slotOffset + dayOffset;
    }
    var slot = this.slots[sessionNumber];
    delete slot.capacity;
    return slot;
  }

  register() {
    return this.getFirstAvailableSlot();
  }
}
