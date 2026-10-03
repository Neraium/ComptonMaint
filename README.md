# Compton Family Maintenance

Static website for Compton Family Maintenance in Gold Canyon, Arizona. HTML, CSS,
and browser JavaScript only; no build step or server runtime is required.

## Preview and hosting

Run `python3 -m http.server 8080` from this directory and visit
`http://localhost:8080`. GitHub Pages publishes the root of `main` at
https://neraium.github.io/ComptonMaint/. Keep `.nojekyll` and relative asset paths
for project-path hosting. If a custom domain is configured, update the canonical,
Open Graph URL, and Open Graph image URL in `index.html`.

## Contact and business details

No form backend, company email, or phone number was supplied. The estimate form
explicitly prepares a local, copyable summary and never submits or stores details.
Estimate buttons stay disabled without JavaScript. A native dialog opens immediately
from every estimate CTA; mobile uses a bottom sheet. The background is inert and
scroll locked, and focus returns to the triggering button when closed. To accept requests, supply
the approved public contact details and a real delivery endpoint, connect it,
and verify delivery and failure handling before changing the form's messaging.

Confirm the recurring visit options, service scope, and service area with the
business before adding specifics. Priority access, pricing, licensing, guarantees,
reviews, and legal entity suffixes are not asserted without verification.

## Brand and images

The supplied PNG logo is unchanged. Header logo widths remain 320px on desktop,
280px at tablet widths, and 240px (viewport constrained) on phones. Footer width
remains 300px (viewport constrained). Styles are consolidated in `styles.css`.

The existing hero stock image is hosted locally at a reduced download size:

- `assets/home-interior.jpg`: https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea

This is an illustrative property image, not a company project photograph. The
unrelated cleaning-service image was removed. Real company/team/project photos
can replace illustrative imagery when available and approved.

## Progressive disclosure

Residential, Commercial and Property Management share a keyboard-accessible tab
selector. Primary offerings remain visible in each panel; native details/summary
accordions expose task and plan details. All panels remain readable without
JavaScript. Commercial anchor links select their panel before navigating.

The estimate tool asks for property type, city/neighborhood and work details.
Preparing a summary replaces the fields with a copy/edit view. Drafts last only
while the page is open; no server request or persistent storage is used.
