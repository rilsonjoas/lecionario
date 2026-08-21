const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);

// react-native 0.81.5 pulls @react-native/virtualized-lists which depends on
// react-native ^0.86, causing npm to install a nested copy. Metro then tries
// to run codegen on RN 0.86's experimental Flow-typed files using the RN 0.81
// codegen plugin, which crashes. Blocking the nested path fixes the bundling.
config.resolver.blockList = [
  /node_modules\/react-native\/node_modules\/react-native\/.*/,
];

module.exports = config;