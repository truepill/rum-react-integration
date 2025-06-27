# RUM React Integration

Datadog react integration used by Truepill Vpharm 🚀.

## Releasing new versions

This package is published to Github Packages using [Semantic Release](https://github.com/semantic-release/semantic-release)/[Semver](https://semver.org/)

Depending on the type of your change, you need to follow the following commit message styles:

`feat: add tracking for cart button press`

| Commit message                                                                                                                                                                                   | Release type                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | ~~Patch~~ Fix Release                                                                                           |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release                                                                                       |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release <br /> (Note that the `BREAKING CHANGE: ` token must be in the footer of the commit) |

Note: You should at all time avoid breaking changes where possible.

## Why do we maintain this fork ourselves?

The fork we were using didn't work with pnpm. This fixes an issue installing the original module via `pnpm` by removing `webpack` entirely.
