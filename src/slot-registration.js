import { Duration } from "luxon";
import * as AthensDateTime from "./athens-date-time.js";

export default class SlotRegistration {
  constructor(config) {
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
        var slotDuration = Duration.fromObject({
          minutes: this.slotLength
        });
        slotTimeStart = slotTimeStart.plus(slotDuration);
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
            if (AthensDateTime.hasSameDate(testDate, dates[j])) {
              return false;
            }
          }
          return true;
        })(dates, this.slots[i].time)
      ) {
        dates.push(this.slots[i].time);
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
      if (AthensDateTime.hasSameDate(this.occupancies[i].date, slotsDate)) {
        this.occupancies[i].count = count;
        return;
      }
    }
    throw new RangeError("Date does not exist in time range");
  }

  countOccupantsInDay(date) {
    for (var i = 0; i < this.occupancies.length; i++) {
      if (AthensDateTime.hasSameDate(this.occupancies[i].date, date)) {
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
      if (AthensDateTime.hasSameDate(this.slots[i].time, date)) {
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
      if (AthensDateTime.hasSameDate(this.occupancies[i].date, date)) {
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

  isAvailableForDate(date) {
    if (this.arrivalDate == "On Time") {
      return true;
    }
    if (date < this.getEarliestTimeAvailable()) {
      return false;
    }
    return true;
  }

  getEarliestTimeAvailable() {
    if (this.arrivalDate != "On Time") {
      return this.arrivalDate.plus({ days: 1 }).startOf("day");
    }
  }

  getOccupancyWithLeastOverflowLayersAfterArrivalDate() {
    var lowestOccupancy = this.occupancies[0];
    var leastOverflow = this.calculateOverflowLayers(this.occupancies[0].date);
    var earliestTimeAvailable = this.getEarliestTimeAvailable();
    for (var i = 1; i < this.occupancies.length; i++) {
      if (!this.isAvailableForDate(this.occupancies[i].date)) {
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
      if (AthensDateTime.hasSameDate(this.slots[i].time, date)) {
        amountOfSlots++;
      }
    }
    return amountOfSlots;
  }

  getIndexOfDayInSlots(date) {
    for (var i = 0; i < this.slots.length; i++) {
      if (AthensDateTime.hasSameDate(this.slots[i].time, date)) {
        return i;
      }
    }
  }

  getFirstAvailableSlot() {
    var allAvailableDaysAreFull = true;
    for (var i = 0; i < this.occupancies.length; i++) {
      // assume that they are only available the day after they arrive
      if (!this.isAvailableForDate(this.occupancies[i].date)) {
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
        if (AthensDateTime.hasSameDate(this.slots[i].time, firstAvailableDay)) {
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
    // shallow copy
    var slot = Object.assign({}, this.slots[sessionNumber]);
    delete slot.capacity;
    return slot;
  }

  register() {
    return this.getFirstAvailableSlot();
  }
}
