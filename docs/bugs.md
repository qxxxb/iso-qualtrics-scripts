# Bugs

## U+200E
For some reason, the Unicode character U+200E, "‎" (known as "LEFT-TO-RIGHT MARK")
shows up in embedded data. I didn't notice this until I was extracting data from
the exported CSV file. Additionally, when I happened to check on 2018-07-24, it
seems that the word "bytes" is appended to some of the data fields, which
previously had not been there before.

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/bugs/u200e/bytes-1.png)

However, when clicking "Edit Condition", it is not visible.

![screenshot](https://github.com/brickmill/iso-qualtrics-scripts/raw/master/docs/bugs/u200e/bytes-2.png)

In any case, it seems that the biggest issue this bug has caused is
messing up Excel's value formatting parser upon importing the exported CSV from
Qualtrics. However, this can simply be fixed by searching and deleting all
instances of U+200E in the imported CSV file.

If you are on Windows, remember that Excel (and Windows in general) uses some
weird non-UTF-8 encoding by default, so be conscious of that.

Since I hope that the next survey developer will recreate the current survey
instead of working from a copy, this bug will hopefully not appear again.
