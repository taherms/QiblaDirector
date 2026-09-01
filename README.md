# Qibla Compass

A single-page web app that calculates the exact great-circle bearing to the
Kaaba from wherever you are, shows the full spherical-trigonometry
calculation, and draws the shortest path on a draggable globe.

No build step, no backend, no dependencies to install — `index.html` loads
D3, a world map, and Google Fonts (Amiri, Aref Ruqaa, Cairo) from a CDN at
runtime. Everything else runs in the browser. It's also an installable app
(see below) — a `manifest.webmanifest`, a service worker (`sw.js`), and an
`icons/` folder are the only other files in the repo, and they're what make
"Add to Home Screen" work on both iOS and Android.

## Features

- **Geolocation** — one tap to use your device's current position.
- **City search** — type a city or place name and pick from matching
  results (powered by OpenStreetMap Nominatim), no coordinates needed.
- **Manual entry** — type in latitude/longitude directly as a third option.
- **Default location** — Mumbai, India, until you set your own.
- **Cookie memory** — your last location is remembered in a cookie
  (1 year expiry) so the compass is ready next visit. Nothing leaves your
  browser.
- **Full calculation shown** — every step of the great-circle bearing
  formula, with your actual numbers plugged in.
- **Compass** with the angle from true north front and center, plus an
  optional **live mode** that uses your phone's compass sensor so the
  dial turns with you — line the gold marker up with the fixed pointer
  at the top and you're facing Qibla.
- **Interactive globe** (D3, orthographic projection) showing the
  great-circle arc from your location to Mecca — drag to look around.
- **Fatimid-inspired design** — a gold-on-green palette, an Arabic
  calligraphy header (Aref Ruqaa) with arabesque flourishes, and geometric
  lattice/frieze motifs evoking Fatimid Cairo and Dawoodi Bohra
  ornamentation. Fully responsive from small phones to laptop screens.
- **Installable app** — "Add to Home Screen" on iOS or Android puts it on
  the home screen with its own icon, opens full-screen with no browser
  chrome, and keeps working offline after the first visit (a service
  worker caches the app shell).

## Install on your phone

**Android (Chrome):** open the site, tap the **⋮** menu, then **Install
app** (or **Add to Home screen**). Chrome may also offer this automatically
via a banner or an install icon in the address bar.

**iOS (Safari):** open the site, tap the **Share** icon, then **Add to Home
Screen**. Safari is the only iOS browser that can do this — Chrome/Firefox
on iOS can't install web apps.

Either way you get a home-screen icon that opens the compass full-screen,
without the browser's address bar.

## Deploy to GitHub Pages

1. Create a new GitHub repository (public, so Pages can serve it for free).
2. Add `index.html`, `manifest.webmanifest`, `sw.js`, the `icons/` folder,
   and this `README.md` to the repo root, then push:
   ```bash
   git init
   git add index.html manifest.webmanifest sw.js icons README.md
   git commit -m "Qibla Compass"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a
   branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
6. GitHub gives you a URL shortly after, typically:
   `https://<your-username>.github.io/<your-repo>/`

That's the whole deployment — there's nothing to build or configure.

## Notes

- **Geolocation, the live compass, and the service worker all need HTTPS**
  (or `localhost`) — service workers (and therefore installability) simply
  don't register on plain `http://`. GitHub Pages serves over HTTPS by
  default, so this works out of the box once deployed. If you test locally,
  run a local server rather than opening the file directly — e.g.
  `python3 -m http.server` in this folder, then visit
  `http://localhost:8000`.
- **Updating the deployed app**: the service worker caches the app shell
  aggressively so it works offline. After changing `index.html` or the
  icons, bump `CACHE_NAME` in `sw.js` (e.g. `qibla-compass-v1` →
  `-v2`) so returning visitors — including anyone who's already installed
  it — pick up the new version instead of a stale cached copy.
- **Live compass** reads your phone's magnetometer via the
  DeviceOrientation API. It only works on a device that actually has a
  compass sensor (most phones; most laptops/desktops don't), and iOS
  Safari will show its own permission prompt the first time you tap the
  button. It shows *magnetic* north, which can be a few degrees off from
  *true* north depending on where you are — the printed angle above the
  compass is always the precise, calculated figure regardless of the
  sensor.
- **City search** calls the public OpenStreetMap Nominatim API directly
  from the browser — free, no API key, but meant for light personal use
  (searches only fire when you tap "Search," never as you type). See
  their [usage policy](https://operations.osmfoundation.org/policies/nominatim/).
  If you expect heavier traffic, swap in a keyed provider (e.g. LocationIQ,
  OpenCage, Mapbox) or self-host Nominatim.
- The Kaaba coordinate used is **21.4225°N, 39.8262°E** (Al-Masjid
  al-Haram, Mecca), a standard reference point.
- The bearing is computed with the **great-circle (spherical
  trigonometry) initial-bearing formula** — the mathematically correct
  method for long distances, as opposed to drawing a straight line on a
  flat map (which gives the wrong direction except along the equator or a
  shared meridian).
- To change the default city, edit the `DEFAULT_LOCATION` constant near
  the top of the `<script>` block in `index.html`.
