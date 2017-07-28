# count-your-issues

Try to find out how many issues/bugs you've filed, ever

## Usage

`count-your-issues` is invoked with a single argument, a path to a JSON config file. Like so:

    % count-your-issues config.json

The JSON config file is expected to be a single array of objects describing where to look for issues. Each object has a `type` key, which specifies the provider to use. The rest of the object keys are options for the provider.

## License

GNU GPL 3.0 or later

## Author

AJ Jordan <alex@strugee.net>
