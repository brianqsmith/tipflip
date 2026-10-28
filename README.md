# TipFlip

A joke iOS and Android app that flips restaurant tip screens into a "select a customer discount" screen. It runs fully offline and stores everything on the phone.

Built with React Native and Expo (Expo Router). The product spec and mockups live outside this repo.

## Run it

```bash
npm install
npx expo start      # scan the QR code with Expo Go
npm run typecheck
```

## Layout

- `src/app/` screens (each file is a route)
- `src/components/` shared UI, including the tipflip `Logo`
- `src/theme/` light and dark color palettes and the theme provider
- `src/settings/` the settings and their defaults
- `src/storage/` the on-device history database (SQLite)
- `src/hooks/` shared screen behavior: blocking Android back, logo reset, saving a discount
- `assets/` app icon, Android adaptive icon, splash, and the source `logo.svg`
