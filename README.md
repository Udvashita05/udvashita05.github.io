# Udvashita’s portfolio

Static portfolio with a scrollable homepage and persistent lavender light / baby pink dark themes.

## Local preview

Run `npm run dev`, then open http://localhost:5173. Requires Python 3.

## Prepare for deployment

Run `npm run build` with Node.js 18 or newer. No dependency installation is needed.

Upload the contents of `dist/` to any static web host. For hosts that build from this repository, use `npm run build` as the build command and `dist` as the publish directory. No server, environment variables, or secrets are required. This command prepares files locally; it does not deploy anything.

## Update content

- `index.html`: homepage introduction and profile picture.
- `app.js`: section content and the `socialProfiles` URLs.
- `styles.css`: compiled styles and custom appearance rules.
- `assets/`: profile picture and background texture.

Projects are intentionally empty. Social profile URLs are not configured yet. Add them to `socialProfiles` before sharing if you want active social links. Google Fonts needs an internet connection; local fallback fonts are provided.

