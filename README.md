# Qibla Compass

A single-page web app that calculates the exact great-circle bearing to the
Kaaba from wherever you are, shows the full spherical-trigonometry
calculation, and draws the shortest path on a draggable globe.

No build step, no backend, no dependencies to install — it's one HTML file
that loads D3 and a world map from a CDN at runtime. Everything else runs in
the browser.

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

## Deploy to GitHub Pages

1. Create a new GitHub repository (public, so Pages can serve it for free).
2. Add `index.html` (and this `README.md` if you like) to the repo root and
   push:
   ```bash
   git init
   git add index.html README.md
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

- **Geolocation and the live compass both need HTTPS** (or `localhost`).
  GitHub Pages serves over HTTPS by default, so this works out of the box
  once deployed. If you test locally, run a local server rather than
  opening the file directly — e.g. `python3 -m http.server` in this
  folder, then visit `http://localhost:8000`.
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
