# Using a Spreadsheet

A video demonstrating how to transfer data from Qualtrics to the report template (located at: `./using-a-spreadsheet/report-template.xlsx`):
https://www.youtube.com/watch?v=BBDPXZUhxow

Make sure subtitles are on.

In the video, I dragged and dropped the CSV file onto an executable that deletes
all instances of the unicode character U+200E (see the section called "U+200E"
in `docs/bugs.md` for more information). Unfortunately, I ran into issues running that on other
machines, so I decided not to use it. Instead, I did this:

1. Open CSV in Excel
2. Search and replace the U+200E character (make sure encoding is correct)
3. Save as CSV

---

### Notes

- Regarding the report template:
  - There are several sheets:
    1. Raw
    2. Total
    3. PCI (Paperwork Check-ins)
    4. IRS (Immigration Regulations Sessions a.k.a. 9 Tools for International
       Student Success)
    5. MS (Mandatory Sessions)
    6. Lunch 
  - The sheet named "Raw" contains almost all the data from CSV, and therefore is very large
    and messy. You will not need to touch Raw unless you are updating data
    from a new CSV file or changing data by hand (which I wouldn't recommend
    unless you are fine with having inconsistent data between the
    spreadsheet and the responses recorded on Qualtrics).
  - There is a good chance that there will be rows with incomplete data. This most
    likely because that person has begun but not yet completed the survey.
  - All sheets except Raw have an ID column (generated using a macro). This is
    so that it is possible to return the data to its original order after
    sorting it. Even with this ID column, I would still recommend duplicating a
    sheet if you want to sort or filter it (or do other similar things).
    - Before sorting a column, it is often necessary to filter out blanks so
      that they do not show up on top.
  - Red rows mean that the student arrived after the latest possible date and
    cannot attend the orientation. Other forms of conditional formatting can be
    added as well.
