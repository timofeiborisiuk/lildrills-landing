# LilDrills landing page

This repository contains the official LilDrills marketing site for lildrills.com.

## Development

- Use the Node.js version in `.nvmrc` and keep `package-lock.json` in sync with dependency changes.
- Use React, Vite, TypeScript, and CSS. Prefer existing dependencies and use Motion only when complex animation warrants it.
- Write code and technical comments in English. Keep components focused and reuse them where they share behavior or layout.
- Keep work within this repository. Publish only when explicitly requested.

## Design and quality

- Use the approved Figma design as the visual reference. Check layouts from 320 px through 1920 px and on wider screens.
- Use Navigo when the font files are provided. Provide suitable fallback fonts while Navigo loads or is unavailable.
- Use semantic HTML, logical headings, descriptive page metadata, and meaningful alternative text. Support keyboard navigation, visible focus, and reduced-motion preferences.
- Size and compress images appropriately. Reserve image dimensions to prevent layout shifts and lazy-load suitable below-the-fold images.
- Check affected layouts and interactions in Chrome, Safari, Firefox, and Edge when making UI changes.

## Verification

- Run `npm run lint` and `npm run build` before handing off changes.
- Keep the production output in `dist/` deployable on a static server without a Node.js runtime.
