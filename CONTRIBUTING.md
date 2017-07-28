# Hacking

## Providers

Each provider is stored in `lib/$name.js` and exports a `.invoke()` function which is passed the options object provided by the user. `.invoke()` is expected to return a Promise which resolves to an Array with two elements - the first being the issue count and the next being a human-readable name for that job. Sometimes you can just set a static name, but usually you want it to be the domain name of the provider instance.
