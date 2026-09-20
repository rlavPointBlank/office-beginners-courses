# Microsoft Office for Beginners

**Independent and unofficial.** This isn't produced, reviewed, or endorsed by Microsoft — it's a personal project built to teach these tools to someone taking on a treasurer/volunteer-organizer role for the first time. "Microsoft," "Office," "Excel," "Outlook," "PowerPoint," and "OneNote" are trademarks of Microsoft Corporation, used here only to describe the software the course is about.

## What this is

A set of short, self-paced, browser-based courses walking through the core Microsoft Office apps from the ground up — no prior experience assumed. Each course follows the same format: short lessons, a hands-on exercise, and a short quiz you need to pass to unlock the next chapter. Progress is saved automatically in your browser as you go.

The courses share a running example — a small volunteer organization's dues, donations, and board meetings — so the exercises feel like real work rather than busywork.

## Getting started (no GitHub or technical experience needed)

If someone sent you a link to this page, here's how to get the courses onto your computer and running. Takes about a minute.

**1. Download the files**
- Near the top of this page, click the green **`< > Code`** button.
- In the menu that opens, click **Download ZIP**.
- Your browser saves a file — usually to a folder called "Downloads." (If your browser asks where to save it, anywhere is fine, as long as you remember where.)

**2. Unzip it**
A ZIP file is a folder squeezed down for downloading — you need to "unzip" it before you can use what's inside.
- **Windows:** Find the downloaded file (open File Explorer ▸ Downloads), right-click it, and choose **Extract All...**, then **Extract**.
- **Mac:** Find the downloaded file (open Finder ▸ Downloads) and just double-click it — it unzips automatically.

Either way, this creates a new folder with all the course files inside it.

**3. Put it somewhere you'll remember**
Drag or move that whole folder into your **Documents** folder. Naming it something clear — like "Office Courses" — makes it easy to find again later. It doesn't matter exactly where it lives, as long as all the files stay together in the same folder; they refer to each other by name.

**4. Open the courses**
Open that folder and double-click **`Office for Beginners.html`**. It'll open automatically in whatever web browser you normally use (Chrome, Edge, Safari, etc.) — no installation, no account, nothing else to set up. From there, pick any course and click **Start course**.

Your progress is saved automatically in that browser, on that computer, as you go — no need to create an account or sign in to anything for the courses themselves.

> **If you don't see a green Code button:** this repository is currently private, which means you need to be specifically invited to view it. If that happens, let whoever shared this with you know — either they can add you as a collaborator on GitHub, or, often simpler, they can just download the ZIP themselves (steps above) and send you that file directly (by email, a shared drive, a USB stick — whatever's easiest).

## Courses

| Course | Covers |
|---|---|
| `Excel for Beginners.html` | Dues, donations, expenses, and formulas that don't break |
| `Outlook for Beginners.html` | Inbox, calendar, and contacts — the daily correspondence |
| `PowerPoint for Beginners.html` | Building, designing, and presenting a board report |
| `OneNote for Beginners.html` | A running notebook: meeting notes, action items, search |
| `Word for Beginners.html` | Styled, reviewable documents — minutes, letters, mail merge |

Start at **`Office for Beginners.html`** — it links out to whichever course you want, in any order, and shows progress across all of them.

## What's in this folder

- `Office for Beginners.html` — start here; links to every course
- `Excel/Outlook/PowerPoint/OneNote/Word for Beginners.html` — the five courses themselves
- `Treasurer Practice.xlsx` / `.pptx` / `.docx` — the practice files the Excel, PowerPoint, and Word courses ask you to open along the way (Word's mail-merge chapter also reuses the Excel workbook). Outlook and OneNote don't have a practice file — their exercises work directly in your own mailbox/notebook instead.
- `course-engine.js` / `course-engine.css` — shared code all five courses run on; not something you need to open yourself

Keep every file in this folder together — each course page depends on `course-engine.js` and `course-engine.css` sitting right next to it, so moving a single course file out on its own will break it.

## For technical readers

These are static HTML files with no build step or dependencies — open `Office for Beginners.html` directly, or serve the folder with any static file server if you'd rather run it that way.
