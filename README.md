# count-your-issues

Try to find out how many issues/bugs you've filed, ever

## Usage

`count-your-issues` is invoked with a single argument, a path to a JSON config file. Like so:

    % count-your-issues config.json

The JSON config file is expected to be a single array of objects describing where to look for issues. Each object has a `type` key, which specifies the provider to use. The rest of the object keys are options for the provider. You can specify as many providers as you want, including specifying providers more than once.

If you need an example, you can check out my personal configuration at [this Gist](https://gist.github.com/strugee/302f52fc30c38c4c0dc01a116497cd22).

## Provider config

### `github`

Queries `github.com`.

Takes one parameter, `username`, which is exactly what it sounds like. Example:

```json
{
  "type": "github",
  "username": "alice"
}
```

### `gitlab`

Queries GitLab instances, by default `gitlab.com`.

Takes a `username` parameter and a `cookie` parameter. To get `cookie`, inspect any old request to GitLab in your browser's devtools, and copy the value of the `Cookie` header into this field. Example:

```json
{
  "type": "gitlab",
  "username": "alice",
  "cookie": "__utma=244825513... <etc.>"
}
```

You can also override what GitLab instance `count-your-issues` connects to with the `instance` parameter. For example:

```json
{
  "type": "gitlab",
  "instance": "https://gitlab.example.com",
  "username": "alice",
  "cookie": "__utma=244825513... <etc.>"
}
```

Note that the protocol (probably `https://`) is required.

### `bugzilla`

Queries Bugzilla instances, by default `bugzilla.mozilla.org`. Bugzilla must be new enough to have either REST API support or JSON-RPC support. At least Bugzilla 4.4+ meets this requirement, and possibly older Bugzillas, too.

Takes a `email` parameter which is, well, your email that you use to login to Bugzilla.

```json
{
  "type": "bugzilla",
  "email": "alice@example.net"
}
```

You can also override what Bugzilla instance `count-your-issues` connects to with the `instance` parameter. For example:

```json
{
  "type": "bugzilla",
  "instance": "https://bugzilla.example.com",
  "email": "alice@example.net"
}
```

Note that the protocol (probably `https://`) is required.

## License

GNU GPL 3.0 or later

## Author

AJ Jordan <alex@strugee.net>
