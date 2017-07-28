# Hacking

## Providers

Each provider is stored in `lib/$name.js` and exports a `.invoke()` function which is passed the options object provided by the user. `.invoke()` is expected to return a Promise.

The module should also export a human-readable `name` property. Look at other providers for examples.
