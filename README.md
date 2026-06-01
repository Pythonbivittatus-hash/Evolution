# Evolution — Glass Mantle Studios Landing Page

A public GitHub Pages landing page for **Evolution**, a card-based strategy game by Glass Mantle Studios.

**Mutata Manent — The changed endure.**

## Live site

Once GitHub Pages is enabled, the site should be available at:

```text
https://pythonbivittatus-hash.github.io/Evolution/
```

## What is included

- `index.html` — branded landing page and interest form
- `styles.css` — dark fossil / aged-gold visual styling
- `app.js` — animation and form submission logic
- `backend/google-apps-script.gs` — Google Apps Script backend for saving signups to Google Sheets
- `LICENSE` — proprietary copyright licence

## Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Go to **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch: `main`.
6. Select folder: `/root`.
7. Save.

## Connect the signup form

The form UI is already built. To make it save responses:

1. Go to [Google Apps Script](https://script.google.com/).
2. Create a new project.
3. Paste the contents of `backend/google-apps-script.gs` into the Apps Script editor.
4. Click **Deploy → New deployment**.
5. Choose **Web app**.
6. Set **Execute as:** `Me`.
7. Set **Who has access:** `Anyone`.
8. Deploy and copy the Web App URL.
9. Open `app.js` and replace:

```js
const FORM_ENDPOINT = "";
```

with your deployed Web App URL:

```js
const FORM_ENDPOINT = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

## Copyright

Copyright © 2026 Ryan Cummins / Glass Mantle Studios. All rights reserved.

This repository is proprietary. See `LICENSE` for details.
