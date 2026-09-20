# Microsoft Office for Beginners

**Independent and unofficial.** This isn't produced, reviewed, or endorsed by Microsoft — it's a personal project built to teach these tools to someone taking on a treasurer/volunteer-organizer role for the first time. "Microsoft," "Office," "Excel," "Outlook," "PowerPoint," and "OneNote" are trademarks of Microsoft Corporation, used here only to describe the software the course is about.

## What this is

A set of short, self-paced, browser-based courses walking through the core Microsoft Office apps from the ground up — no prior experience assumed. Each course follows the same format: short lessons, a hands-on exercise, and a short quiz you need to pass to unlock the next chapter. Progress is saved automatically in your browser as you go.

The courses share a running example — a small volunteer organization's dues, donations, and board meetings — so the exercises feel like real work rather than busywork.

## Courses

| Course | Covers |
|---|---|
| `Excel for Beginners.html` | Dues, donations, expenses, and formulas that don't break |
| `Outlook for Beginners.html` | Inbox, calendar, and contacts — the daily correspondence |
| `PowerPoint for Beginners.html` | Building, designing, and presenting a board report |
| `OneNote for Beginners.html` | A running notebook: meeting notes, action items, search |
| `Word for Beginners.html` | Styled, reviewable documents — minutes, letters, mail merge |

Start at **`Office for Beginners.html`** — it links out to whichever course you want, in any order, and shows progress across all of them.

## Files

- `course-engine.js` / `course-engine.css` — the shared lesson/quiz engine every course runs on
- `Treasurer Practice.xlsx` / `Treasurer Practice.pptx` / `Treasurer Practice.docx` — practice files the Excel, PowerPoint, and Word courses reference by name (Word's mail-merge chapter also reuses the Excel workbook as a data source)
- Outlook and OneNote have no separate practice file — their exercises work directly against your own mailbox/notebook instead

## Running it

These are static HTML files — open `Office for Beginners.html` directly in a browser, or serve the folder with any static file server. No build step, no dependencies.
