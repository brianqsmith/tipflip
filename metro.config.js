// Learn more https://docs.expo.dev/guides/customizing-metro
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite's web build loads a .wasm file; this lets the browser preview bundle it.
config.resolver.assetExts.push('wasm');

// The marketing website in website/ is a separate project; keep Metro out of it.
const websiteDir = path.join(__dirname, 'website').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
config.resolver.blockList = [].concat(config.resolver.blockList ?? [], [new RegExp(`^${websiteDir}[\\\\/].*`)]);

module.exports = config;
