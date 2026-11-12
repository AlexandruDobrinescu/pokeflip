# Pokémon Flipper

A lightweight PWA built as a small Pokémon-style stat flipper. Tap or click the hexagon to randomly compare one of the displayed stats and reveal the winner.

## Features

- Hexagonal flipping UI inspired by classic pixel-art game styling
- Random stat selection for each flip
- Mobile-friendly layout with install support
- Offline-ready service worker caching

## Project structure

- `index.html` – app shell and SVG icon definitions
- `css/style.css` – styles for the game UI
- `js/app.js` – interactivity and install logic
- `sw.js` – service worker for offline caching
- `manifest.webmanifest` – PWA manifest
- `icons/` – app icon assets

## Run locally

From the project root, start a simple local web server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

This project is designed to be served over a local HTTP server. The service worker registration is skipped when opened directly from the filesystem (`file://`), which prevents browser compatibility issues during local file testing.

## License

[CC0 1.0 Universal (Public Domain)](https://creativecommons.org/publicdomain/zero/1.0/)

You may copy, modify, distribute, and use this project for any purpose — commercial or personal — without asking permission.

## AI Usage Disclosure

This project was developed with assistance from Local AI for pair programming. AI was used for:

- Code/asset generation and scaffolding
- Bug fixing and refactoring
- Documentation