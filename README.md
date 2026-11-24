# AfriChance — GitHub Pages starter site

Verified opportunities across Africa. Only real, only active. Starting in Nigeria.

This is the free MVP: a static site, no server, no cost.
- `index.html` — homepage, listings, filters, waitlist form
- `styles.css` — styling
- `script.js` — category filter + waitlist saved to the visitor's browser (localStorage)

## Publish free on GitHub Pages

1. Create a public repo on GitHub named `africhance` (or `africhance.github.io` for a user site).
2. Upload these 3 files to the repo (or push with git).
3. In the repo: Settings > Pages > Build and deployment > Source: Deploy from a branch, Branch: main, Folder: / (root). Save.
4. Your live link will be:
   - `https://<your-username>.github.io/africhance/` (project site), or
   - `https://<your-username>.github.io/` if the repo is named `<your-username>.github.io`

## What GitHub Pages cannot do (yet)

GitHub Pages is static hosting only. It cannot send email/SMS alerts, store signups on a server, or run a subscription system. That is Phase 2 — add Supabase / a backend, or a Google Form for real signups, and keep this site as the front end.

## Adding a new opportunity

Copy one `<article class="card">` block in `index.html`, change the title, description, who/where/deadline, and the official link. Always link to the official organiser's page. Never list an offer that asks people to pay to apply.
