# Survey Flow

Block-level survey logic goes here.

---

### Notes
- Note the extensive use of embedded data. There are a few reasons for this:
  1. Embedded data can be easily set and obtained from the Qualtrics JavaScript
     API.
  2. I personally like to use embedded data like they are variables. Doing so
     eliminates hard-coding values into questions, which makes them reusable and
     easier to maintain.
  3. You can choose a succinct label for embedded data fields, which makes your
     piped text (such as in the email tasks) cleaner and more self-explanatory.
     Also, it looks nicer in reports to have the label instead of the entire
     question text.
- It is a good idea to put set the `Survey Completion` embedded data
  field to `Success`, so you can tell which participants are still in progress
  of completing the survey. I forgot to do this.

### Resources

- https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/survey-flow-overview/
