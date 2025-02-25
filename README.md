# RUM React Integration

Datadog react integration used by Truepill Vpharm 🚀.

## Releasing new versions

This package is published to Github Packages using [Semantic Release](https://github.com/semantic-release/semantic-release)/[Semver](https://semver.org/)

Depending on the type of your change, you need to follow the following commit message styles:
  
`feat: add tracking for cart button press`

| Commit 	            | Release Type     	| Definition                                                  	|
|------------------   |------------------	|-------------------------------------------------------------	|
| fix:   	            | Patch release    	| When you make backward compatible bug fixes                 	|
| feat:  	            | Feature release  	| When you add functionality in a backwards compatible manner 	|
| BREAKING CHANGE:  	| Breaking release 	| When you make incompatible API changes                      	|

Note: You should at all time avoid breaking changes where possible.

## Why do we maintain this fork ourselves?

The fork we were using didn't work with pnpm. This fixes an issue installing the original module via `pnpm` by removing `webpack` entirely.
