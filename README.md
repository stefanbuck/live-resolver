# Live resolver [![Build Status][travis-image]][travis-url]

Returns the github repository url for the requested package.

The supported registries are:
  - [npmjs.com](https://npmjs.com)
  - [bower.io](http:/bower.io)
  - [getcomposer.org](https://getcomposer.org)
  - [rubygems.org](https://rubygems.org)
  - [pypi.python.org](https://pypi.python.org)
  - [crates.io](https://crates.io)
  - [melpa.org](https://melpa.org)
  
## Find a package

https://githublinker.herokuapp.com/q/{registry}/{package}

Registry must be one of:
  - `npm`
  - `bower`
  - `composer`
  - `rubygems`
  - `pypi`
  - `crates`
  - `melpa`
  - `java`

Example:

https://githublinker.herokuapp.com/q/bower/backbone

Response:

```json
{
  "url": "https://github.com/jashkenas/backbone"
}
```

## Installation

Install dependencies:

`yarn install`

Run server:

`yarn start`

## Testing

`yarn test`

## Privacy Policy

Our [Privacy Policy](https://github.com/OctoLinker/OctoLinker/blob/master/privacy-policy.md) describes our practices related to the use, storage and disclosure of information we collect when you're using our service.

If you do not want your requests to be logged, you can opt-out of logging by sending `'Do-Not-Track': '1'` or `'DNT': '1'` in the request headers.

## License

Copyright (c) 2015 Stefan Buck. Licensed under the MIT license.


[travis-url]: https://travis-ci.org/OctoLinker/live-resolver
[travis-image]: https://travis-ci.org/OctoLinker/live-resolver.svg?branch=master
