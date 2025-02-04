# RUM React Integration

Datadog react integration used by Truepill Vpharm 🚀.

## Releasing new versions

Depending on the kind of changes you're introducing to the library, choose the appropriate command to update the package version.

```zsh
pnpm version patch   # 1.0.0 → 1.0.1
pnpm version minor   # 1.0.0 → 1.1.0
pnpm version major   # 1.0.0 → 2.0.0
```

These commands all commit and tag the change. This means, this commit that `pnpm` created for you will be associated with its own tag for you to create a release off of.

Push this change and, when you're ready to publish the package, create a release on GitHub Actions using the tag that was created in the previous step. Preferably, name the release `v1.0.0` if the package version is `"1.0.0"` in the `package.json` file. After you create the release the `publish` workflow will run on GitHub Actions and the package will be available for you to consume from other projects with access to the `@truepill` org.

## Why do we maintain this fork ourselves?

The fork we were using didn't work with pnpm. This fixes an issue installing the original module via `pnpm` by removing `webpack` entirely.

At the time of creating this fork we were declaring the dependency as a link to the repository, to a specific commit. We changed that approach to releasing the package to the GitHub registry so we can consume it the same way we do `@truepill/capsule`.
