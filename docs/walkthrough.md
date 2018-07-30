# Walkthrough

## Set Up Qualtrics

Your supervisors will send you an invitation to a copy of the previous year's
Qualtrics survey. Accept the invitation through your Ohio University issued
Qualtrics account.

## Learn How to Use Qualtrics

Qualtrics has provided its own excellent documentation here:
https://www.qualtrics.com/support/survey-platform/

Try to get a decent understanding of the survey platform. There are also
specific things that you should focus on:
- Embedded Data
- Piped Text
- Branch Logic
- Validation
- Quotas
- JavaScript
- Survey Options
- Partial Completion
- Email Tasks
- Data & Analysis

Also, make sure to read or at least skim the rest of the documentation contained
in this repository before continuing.

## Set Up the New Survey

Though you could modify the previous year's survey to fit your needs, I would
not recommend that for a few reasons:
- It will be messy and unpleasant
- You will get a clearer understanding of how the survey works if you recreate
  it

So again, I would suggest that you start from scratch (though I do encourage you
to import questions and possibly other things from the previous year's survey to
save you some time). As you go through each step, pay close attention to how it
was done in the previous year.

## Demographics

Start by creating the `Demographics` blocks, which should be fairly
straightforward. Some things may require a bit more work:
- Validation on the PID (see `docs/qualtrics/survey/questions/validation.md`)
- Display logic for F-1 and J-1 visas
- Getting the date

After creating the questions, you should extract the following into embedded
data fields:
- `Student Type` (e.g. `Undergraduate`, `Graduate`, `OPIE`)
- `Arrival Date` (e.g. `On Time`, `2018-08-15`)
  - `Arrival Year` (e.g. `2018`)
  - `Arrival Month` (e.g. `8`)
  - `Arrival Day` (e.g. `15`)
- `Visa Type` (e.g. `F-1`, `J-1`)

## Scheduling

At this point you can create embedded data fields for the date, time, and
location of each event. If you are certain that a particular field with not
change (e.g. the `Lunch Location` will always be `Nelson Dining Hall`), then you
may go ahead and set it. Otherwise, leave them blank.

Next you can create the `Scheduling Introduction` block.

Once that is done, we can begin creating branch logic for the events. It would
be beneficial to branch in chronological order (when possible). I would highly recommend
that you study the way these branches were done in the previous year, as this
would most likely allow you to understand more quickly than if I were to attempt
to explain. A few things to note here:
- A common technique I used was to set some embedded data and then display a
  question block utilizing that embedded data immediately after. An example is shown below:

  ![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/embedded-data-then-question-block.png)

- Another common technique was the use of an introduction block, which contained
  a brief description of the event as well as some JavaScript to calculate the
  date, time, and location of the event. The JavaScript often required data in
  the form of embedded data to make the calculation as well (for more
  information about writing JavaScript, see the appropriate section of this
  documentation). Here is an example:

  ![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/with-introduction.png)

  You may also have noticed that the embedded data in the screenshot above
  contains piped text from quota counts—see
  `docs/qualtrics/survey/survey-tools/quotas.md` for more information. These
  must be set up correctly in order for the JavaScript to function correctly.

- In the previous year's survey, the first week's events were intended for
  graduate students and the second week's events were intended for undergraduate
  and OPIE students. Assuming that this still is the case, you will have to
  handle the fact that late graduate students who miss an event often attend the
  equivalent session for undergraduates in the second week as a make-up event.

  Fortunately, this can be handled like so:

  ![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/graduate-make-up-event.png)

  The `Graduate | Missed Required Event, Make Up Event Available` is a
  multipurpose question block that simply displays a message that the participant
  has missed a required event (specified by the embedded data field `Missed Event
  Name`) and that he/she is required to attend the equivalent event for
  undergraduates.

  After that, the normal event for undergraduates is shown.

### Example 1: Graduate Paperwork Check-ins

First create the introduction block:

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-1/introduction-block.png)

The JavaScript for that block will contain a Webpack-compiled version of the
following (the times and locations may obviously be different from what they actually
should be):

```js
import SlotRegistration from "slot-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: AthensDateTime.create("2018-08-15T09:00"),
          end: AthensDateTime.create("2018-08-16T00:00")
        }
      },
      {
        time: {
          start: AthensDateTime.create("2018-08-15T13:00"),
          end: AthensDateTime.create("2018-08-15T16:00")
        }
      },
      {
        time: {
          start: AthensDateTime.create("2018-08-16T09:00"),
          end: AthensDateTime.create("2018-08-17T00:00")
        }
      }
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  var amountRegistered815 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/15 Paperwork Check-in Quota Count"
  );
  var amountRegistered816 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/16 Paperwork Check-in Quota Count"
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-15"),
    amountRegistered815
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-16"),
    amountRegistered816
  );

  var arrivalDate = Qualtrics.SurveyEngine.getEmbeddedData("Arrival Date");
  if (arrivalDate != "On Time") {
    var arrivalDate = AthensDateTime.create(arrivalDate);
  }
  registration.setArrivalDate(arrivalDate);

  var slot = registration.register();

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Paperwork Check-in Time",
    AthensDateTime.timeToString(slot.time)
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Paperwork Check-in Date",
    AthensDateTime.dateToString(slot.time)
  );
});
```

Note that the JavaScript requires these two embedded data fields:
- `8/15 Paperwork Check-in Quota Count`
- `8/16 Paperwork Check-in Quota Count`

Keep this in mind when we create the quotas and when we insert the introduction
block into the survey flow.  However, before we do that, we need create the
confirmation block that displays date, time, and location of the paperwork
check-in:

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-1/confirmation-block.png)

Next, we can create the quotas required for this event:

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-1/quotas.png)

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-1/quota-8-15.png)

Now let's go ahead and add the blocks into the survey flow:

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-1/survey-flow.png)

### Example 2: Undergraduate Paperwork Check-ins

Once again, we first create the introduction block. In this case, it has the same content has the introduction block for graduate paperwork check-ins, so we can just pipe the text:

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-2/introduction-block.png)

The JavaScript for this block is a Webpack-compiled version of the following (once again, the dates and times may be different):

```js
import SlotRegistration from "slot-registration.js";
import * as AthensDateTime from "athens-date-time.js";

Qualtrics.SurveyEngine.addOnload(() => {
  var registration = new SlotRegistration({
    slotRanges: [
      {
        time: {
          start: AthensDateTime.create("2018-08-20T14:00"),
          end: AthensDateTime.create("2018-08-20T16:00")
        }
      },
      {
        time: {
          start: AthensDateTime.create("2018-08-21T13:00"),
          end: AthensDateTime.create("2018-08-21T17:00")
        }
      }
    ],
    slotLength: 15,
    slotCapacity: 10
  });

  var amountRegistered820 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/20 Paperwork Check-in Quota Count"
  );
  var amountRegistered821 = Qualtrics.SurveyEngine.getEmbeddedData(
    "8/21 Paperwork Check-in Quota Count"
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-20"),
    amountRegistered820
  );
  registration.setOccupancy(
    AthensDateTime.create("2018-08-21"),
    amountRegistered821
  );

  var arrivalDate = Qualtrics.SurveyEngine.getEmbeddedData("Arrival Date");
  if (arrivalDate != "On Time") {
    var arrivalDate = AthensDateTime.create(arrivalDate);
  }
  registration.setArrivalDate(arrivalDate);

  var slot = registration.register();

  Qualtrics.SurveyEngine.setEmbeddedData(
    "Paperwork Check-in Time",
    AthensDateTime.timeToString(slot.time)
  );
  Qualtrics.SurveyEngine.setEmbeddedData(
    "Paperwork Check-in Date",
    AthensDateTime.dateToString(slot.time)
  );
});
```

Note that the JavaScript requires these two embedded data fields:
- `8/20 Paperwork Check-in Quota Count`
- `8/21 Paperwork Check-in Quota Count`

We will reuse the confirmation block that we created when we added the event for graduate paperwork check-ins, so we do not have to create it again.

Make sure to create the quotas like so:

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-2/quotas.png)

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-2/quota-8-20.png)


Now we can add the blocks into the survey flow:

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/walkthrough/scheduling/example-2/survey-flow.png)

## Confirmation and Schedule Email

If the embedded data fields have been set correctly in the survey flow, this
step should be very straightforward. Simply emulate the way this was done in the
previous year (see `docs/qualtrics/actions/email-tasks.md`). I highly recommend
using the source view of the rich content editor to directly access the HTML in
order to get better control of the formatting (see the "Source view" section on
[this Qualtrics support page](https://www.qualtrics.com/support/survey-platform/survey-module/editing-questions/rich-content-editor/rich-content-editor-overview/)
for more information). For example, the email sent to graduates would look like
this:

```html
<span style="font-size:26px;"><strong>Confirmation and Schedule</strong></span><br />
<br />
<p>Dear ${q://QID2/ChoiceTextEntryValue/2} ${q://QID2/ChoiceTextEntryValue/1},</p>
<p>
  Thank you for registering for the International Student Orientation (ISO) at
  Ohio University! There are many activities and social events during ISO so you
  can meet new friends and explore Athens. If you are required to take the TOEFL
  exam, you’ll want to be sure to add all relevant TOEFL events to your calendar.
  You’ll also need to register for the Graduate Student Orientation on August 23.
  Look for an e-mail from the Graduate College with registration details.
</p>
<p>
  Below is a summary of your ISO schedule. You can also view the full ISO
  <a href="https://www.ohio.edu/global/isfs/upload/1Student_Version-Fall-2018-ISO-Schedule_Revised_Rooms.pdf" target="_blank">calendar</a>
  on our <a href="https://www.ohio.edu/global/isfs/" target="_blank">website</a>.
  If you have questions or concerns about your registration, or if you need to
  make changes, please contact Viktoria Marinova at
  <a href="mailto:vm321616@ohio.edu">vm321616@ohio.edu</a> or
  <a href="mailto:isfs@ohio.edu">isfs@ohio.edu</a>.
</p>
<br />
<hr>
<br />
<strong>International Student Orientation Welcome</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/International%20Student%20Orientation%20Welcome%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/International%20Student%20Orientation%20Welcome%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/International%20Student%20Orientation%20Welcome%20Location}<br />
<br />
<strong>Living in Athens Session</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Living%20in%20Athens%20Session%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Living%20in%20Athens%20Session%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Living%20in%20Athens%20Session%20Location}<br />
<br />
<strong>Lunch (optional)</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Lunch%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Lunch%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Lunch%20Location}<br />
<br />
<strong>Academic Success Information Session</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Academic%20Success%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Academic%20Success%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Academic%20Success%20Location}<br />
<br />
<strong>Title IX Information Session</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Title%20IX%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Title%20IX%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Title%20IX%20Location}<br />
<br />
<strong>Paperwork Check-in</strong><br />
<div style="font-style:italic;color:#696969;">Remember to bring the following items:<br />
<ul>
<li>Passport</li>
<li>I-20 or DS-2019</li>
<li>I-94 (if you do not have this, we can help you find it)</li>
<li>Your address in Athens</li>
<li>Your US phone number, if applicable</li>
<li>Your OHIO e-mail address and password</li>
</ul>
</div>
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Paperwork%20Check-in%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Paperwork%20Check-in%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Paperwork%20Check-in%20Location}<br />
<br />
<strong>9 Tools for International Student Success</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Immigration%20Regulations%20Session%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Immigration%20Regulations%20Session%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Immigration%20Regulations%20Session%20Location}<br />
<br />
<strong>Law and Safety Information Session</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Law%20and%20Safety%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Law%20and%20Safety%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Law%20and%20Safety%20Location}<br />
<br />
<strong>Health Insurance Information Session</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Health%20Insurance%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Health%20Insurance%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Health%20Insurance%20Location}<br />
<br />
<strong>Lunch and Resource Fair (optional)</strong><br />
<span style="color:#808080;"><em>Date:</em></span> ${e://Field/Lunch%20and%20Resource%20Fair%20Date}<br />
<span style="color:#808080;"><em>Time:</em></span> ${e://Field/Lunch%20and%20Resource%20Fair%20Time}<br />
<span style="color:#808080;"><em>Location:</em></span> ${e://Field/Lunch%20and%20Resource%20Fair%20Location}
```

## Using a Spreadsheet

See `docs/qualtrics/data-and-analysis/using-a-speedsheet.md`
