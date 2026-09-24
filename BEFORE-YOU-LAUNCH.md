# Before you launch — required replacements

Three things in this project are **placeholder data inherited from the original
build**, not real business information. I deliberately did not invent
replacements. Fix these before the site goes live, or local SEO will work
against you: Google cross-checks NAP (Name, Address, Phone) against your
Google Business Profile and directory listings, and a fake street address is
worse than no address at all.

## 1. NAP — name, address, phone, email

Current placeholder values:

| Field   | Placeholder value                                  |
| ------- | -------------------------------------------------- |
| Address | `123 Travel Street, Madurai, Tamil Nadu, India`     |
| Phone   | `+91 90000 00000` (and `tel:+919000000000`)         |
| Email   | `hello@sutripaar.com`                               |

They appear in exactly these places:

- The footer `<address>` block on all 7 pages + `404.html`
- `contact.html` — the contact info card
- `about-us.html` — the sidebar NAP card
- JSON-LD `TravelAgency` schema in `index.html` and `about-us.html`
- JSON-LD `LocalBusiness` schema in `contact.html`

Quick way to find every occurrence:

```
grep -rn "123 Travel Street\|919000000000\|90000 00000\|hello@sutripaar.com" .
```

Keep the values **byte-identical everywhere**, including inside the JSON-LD.
If you do not have a public street address, delete the `streetAddress` line
from the schema and the address lines from the footer rather than keeping a
fake one — `addressLocality` + `addressRegion` alone is valid schema.

## 2. Domain

Canonicals, Open Graph URLs, `sitemap.xml` and `robots.txt` all assume
`https://www.sutripaar.com/`. If the live domain differs, run:

```
grep -rln "www.sutripaar.com" . | xargs sed -i 's|www\.sutripaar\.com|YOUR-DOMAIN|g'
```

## 3. The enquiry form does not send anything

`contact/index.html` has a fully validated front-end form that currently just
shows a success message. Point it at a real endpoint before launch — see
section 8 of `README.md`.

## Also worth knowing

- Hotel and package listings are marked with `*` and an on-page disclaimer
  saying they are illustrative. Replace them with real inventory, or keep the
  disclaimer. The fabricated star ratings and the invented traveller
  testimonials have already been removed.
- All pages are flat `.html` files at the root — extract the ZIP and upload
  the contents of the `sutri-paar/` folder directly into your document root.
  No `.htaccess`, rewrite rules or directory-index settings are needed.
- The counters on the homepage now state figures that are verifiable from the
  site itself (5 states, 12 packages, 9 stay categories, 6 trip styles). If you
  add packages, update the numbers in `index.html`.
