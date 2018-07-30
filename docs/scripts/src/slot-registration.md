# Slot Registration

- Calculates time slots and determines which slot to register the participant
  in based on occupancies and date of arrival
- If all slots are filled, then new participants will be placed in the next
  slot as soon as the previous slot gains one more participant

---

### Notes

- Occupancies are based on days, not slots (e.g. 25 people registered on August
  15). However, it's simple to calculate which slots are and are not
  occupied given that the slots are filled up in chronological order with no
  gaps within a day.
- `calculateSlots()` should probably be in another class and improved, because slot slicing
  and slot registration should be separated. This became a problem in the
  Immigration Regulations Sessions script
