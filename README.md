# TipFlip

A joke iOS and Android app that flips restaurant tip screens into a "select a customer discount" screen. It runs fully offline and stores everything on the phone.

Built with React Native and Expo (Expo Router). The product spec and mockups live outside this repo.

## Run it

```bash
npm install
npx expo start      # scan the QR code with Expo Go
npm run typecheck
```

## Phone previews (EAS Update + Expo Go)

The project is linked to EAS (`@brianqsmith/tipflip`). `runtimeVersion` is pinned to `exposdk:58.0.0` so Expo Go can load published updates; bump it when upgrading the SDK.

```bash
npx eas-cli update --branch main --environment preview --message "..."
```

Channels: `main` (branch `main`) and `preview` (latest work in progress). Open in Expo Go:

- `exp://u.expo.dev/1583f4f7-feb7-474c-b751-2cdf52362a04?channel-name=main&runtime-version=exposdk:58.0.0`
- `exp://u.expo.dev/1583f4f7-feb7-474c-b751-2cdf52362a04?channel-name=preview&runtime-version=exposdk:58.0.0`

## Layout

- `src/app/` screens (each file is a route)
- `src/components/` shared UI, including the tipflip `Logo`
- `src/theme/` light and dark color palettes and the theme provider
- `assets/` app icon, Android adaptive icon, splash, and the source `logo.svg`
