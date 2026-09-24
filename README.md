# Sutri Paar — Tours & Travels Website

A multi-page, SEO-friendly Tours & Travels website for **Sutri Paar**, focused
on South India (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana).
Built with plain HTML5, CSS3 and vanilla JavaScript — no frameworks, no
build step required.

## 1. Project overview

- 7 pages, all flat `.html` files at the project root: Home (`index.html`),
  Tour Packages (`tour-packages.html`), Hotels (`hotels.html`), About Us
  (`about-us.html`), Support (`support.html`), Contact (`contact.html`) and a
  travel-philosophy page (`about.html`). No page lives in a subfolder, so
  uploading the extracted files straight into your hosting document root
  works without any server rewrite rules or directory-index configuration.
- `robots.txt`, `sitemap.xml` and a branded `404.html` sit at the project
  root alongside the pages.
- Shared design system in `assets/css/` (tokens, layout, components).
- Vanilla JS in `assets/js/` for the hero slider, scroll-reveal animations,
  mobile nav, FAQ accordion, hotel/package filters, contact
  form validation, image lightbox, scroll progress bar and back-to-top button.
- SEO basics on every page: unique title (≤60 chars), unique meta
  description (≤160 chars), canonical URL, Open Graph + Twitter Card tags,
  JSON-LD structured data (TravelAgency/LocalBusiness, WebSite,
  BreadcrumbList, FAQPage where relevant), consistent NAP, internal and
  external links with descriptive anchor text.

## 2. Folder structure

```
sutri-paar/
├── index.html                (Home)
├── tour-packages.html
├── hotels.html
├── about-us.html
├── support.html
├── contact.html
├── about.html                (travel philosophy)
├── 404.html
├── robots.txt
├── sitemap.xml
├── README.md
├── BEFORE-YOU-LAUNCH.md      (placeholder NAP + domain checklist — read this)
└── assets/
    ├── css/    (style.css, responsive.css, animations.css)
    ├── js/     (main.js, slider.js, animations.js)
    └── images/ (hero/, destinations/, packages/, hotels/, about/,
                 contact/, IMAGE-SOURCES.md, favicon.svg)
```

Every page is a flat file at the root and every internal link is relative
(`hotels.html`, `assets/css/style.css`), so the project can be uploaded to a
document root as-is, or served from a subdirectory, without editing paths.

## 3. Running it locally

No build tools needed. Every page is a flat `.html` file using relative
paths, so you can either double-click `index.html` to open it straight from
the filesystem, or serve the folder over HTTP for a closer match to
production:
  ```
  cd sutri-paar
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

## 4. Replacing images

All images are downloaded locally into `assets/images/` (see `assets/images/IMAGE-SOURCES.md`); no external image URLs are used.
this build had no live internet access to license and download real photos.
See `assets/images/IMAGE-SOURCES.md` for:

- exactly which destinations/scenes each image slot needs,
- which royalty-free sources to use (Unsplash, Pexels, Pixabay, Wikimedia
  Commons),
- recommended dimensions per folder,
- the step-by-step swap workflow (download → crop → convert to `.webp` →
  replace file → double check `alt` text still matches).

Pinterest should only ever be used for style inspiration, never as an image
source — most pinned images are not cleared for commercial reuse.

## 5. Editing NAP (Name / Address / Phone)

NAP appears in the footer of every page and in the Contact page's info
card, plus in JSON-LD (`LocalBusiness`/`TravelAgency` schema) on the
homepage and contact page. To update it:

1. Update the footer `<address>` block — it's repeated per page (search for
   `123 Travel Street` across all HTML files).
2. Update the `tel:` and `mailto:` links to match.
3. Update the JSON-LD `address`, `telephone`, and `email` fields in
   `index.html` and `contact/contact.html`.

Keep the business name, address and phone number **identical** across every
page and schema block — inconsistent NAP hurts local SEO.

## 6. Editing social links

The only social profile linked is the real Instagram account:

```
https://www.instagram.com/sutripaar_tours/
```

It appears as an icon **and** a descriptive text link
("Follow Sutri Paar Tours and Travels on Instagram") in the footer of every
page, plus contextual in-copy links on Home, About Us and Contact. It is also
declared as `sameAs` in the JSON-LD on Home, About Us and Contact.

The previous Facebook / YouTube / X placeholder icons were removed rather than
left pointing at dead homepages. To add a real profile later, copy the footer
Instagram markup, change the `href`, the `aria-label` and the SVG path, and add
the URL to the `sameAs` arrays in the three JSON-LD blocks.

Use clean profile URLs only — never paste in share-sheet tracking parameters
such as `utm_source=ig_web_button_share_sheet` or `stkn=`.

## 7. Editing tour packages / hotels

- Tour package cards live in `index.html` (featured set) and
  `tour-packages.html` (full listing by state and category).
  Each card is a `<article class="pkg-card" data-pkg-cat="...">` block —
  duplicate one and edit the text, image, price and `data-pkg-cat` value
  (`weekend`, `family`, `romantic`, `adventure`, `heritage`) to add a new
  package; the category tabs filter on that attribute automatically.
- Hotel cards live in `index.html` (featured set) and
  `hotels/hotels.html` (full listing). Each card uses
  `data-hotel-cat="budget|premium|luxury|resort"` for the filter buttons.

## 8. Connecting the contact form to a backend

`contact/contact.html` contains a fully validated, frontend-only form
(`#enquiry-form` in `assets/js/main.js`). It currently just shows a success
message on valid submission — it does **not** send data anywhere. To make
it functional:

1. Point the `<form>` at a real endpoint (a serverless function, a form
   service like Formspree/Getform, or your own backend) — e.g. add
   `action="/api/enquiry" method="POST"`, or fetch() the form data from
   inside the `submit` handler in `main.js` after validation passes.
2. Keep the existing client-side validation as a first line of defence, but
   also validate on the server — never trust client input alone.
3. Update the success message / error handling in `main.js` to reflect a
   real network response instead of the current demo behaviour.

## 9. SEO notes

### Focus keyword per page (one each — no cannibalisation)

| Page                  | Primary keyword                     |
| --------------------- | ----------------------------------- |
| `index.html`          | South India Tour and Travel Company |
| `tour-packages.html`  | South India Tour Packages           |
| `hotels.html`         | Hotels in South India               |
| `about-us.html`       | Sutri Paar Tours and Travels        |
| `support.html`        | Travel Booking Support              |
| `contact.html`        | South India Tour Enquiry            |
| `about.html`          | Responsible Travel in South India   |

Each page's focus keyword is recorded as an HTML comment directly above its
`<meta name="keywords">` tag, and appears in that page's title, H1, opening
paragraph, at least one H2 and the meta description. Do not reuse one page's
primary keyword as the focus of another.

This is a static site, so there is no Yoast plugin and none is needed — the
equivalent fields are written directly into each page's `<head>`.


- Titles are kept at or under 60 characters; meta descriptions at or under
  160 characters — double check after any copy edits.
- Each page targets 4 keywords woven naturally into the H1, an H2, the
  intro paragraph, body copy and relevant `alt` text — avoid keyword
  stuffing when adding more content.
- Internal links use descriptive anchor text (e.g. "South India tour
  packages") rather than "click here."
- External links point to official tourism boards and open in a new tab
  with `rel="noopener noreferrer"`.
- `assets/images/IMAGE-SOURCES.md` documents image licensing/reference
  requirements — keep it updated as you swap in real photography.

## 10. Accessibility & performance notes

- Animations respect `prefers-reduced-motion` and
  are disabled entirely on touch devices.
- All interactive elements (nav, FAQ, filters, lightbox, form) are
  keyboard-operable, and the lightbox supports `Esc` and arrow keys.
- Images use `loading="lazy"` (except hero slides, which load eagerly)
  and explicit `width`/`height` to reduce layout shift.
- Animations rely on `transform`/`opacity` for GPU-friendly performance.

## 11. Final QA checklist (recap)

- [ ] Read `BEFORE-YOU-LAUNCH.md` and replace the placeholder NAP and domain.
- [ ] Optionally re-export images as `.webp` for a further size saving
      (JPEGs are already recompressed; see `IMAGE-SOURCES.md` for licensing).
- [ ] Connect the contact form to a real backend (see §8).
- [ ] Re-check all titles/descriptions after any copy changes.
- [ ] Test at 320 / 375 / 425 / 768 / 1024 / 1440 / 1920px widths.
- [ ] Test keyboard navigation, screen-reader landmarks, and
      `prefers-reduced-motion`.
- [ ] Run an HTML validator and a Lighthouse pass before launch.
