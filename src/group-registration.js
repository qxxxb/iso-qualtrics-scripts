export default class GroupRegistration {
  constructor(config) {
    this.groups = config.groups;
    this.setDefaultOccupancies();
  }

  setDefaultOccupancies() {
    for (var i = 0; i < this.groups.length; i++) {
      if (!("occupancy" in this.groups[i])) {
        this.groups[i].occupancy = 0;
      }
    }
  }

  setOccupancy(groupNumber, occupancy) {
    this.groups[groupNumber - 1].occupancy = occupancy;
  }

  register() {
    var chosenGroup = this.groups[0];
    for (var i = 1; i < this.groups.length; i++) {
      if (this.groups[i].occupancy < chosenGroup.occupancy) {
        chosenGroup = this.groups[i];
      }
    }
    return chosenGroup;
  }
}
