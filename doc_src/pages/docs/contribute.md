---
title: Contributing
tags: docs
---


### Pull Requests
1) **Include tests**

2) Add an entry to the top of the CHANGELOG, and update the documentation
in `docs/` as needed. (Refactors and documentation changes don't need a
changelog entry.)

3) Squash your commits together in one or a few complete, logical commits,
with a concise and descriptive message. One commit means one
feature/bugfix/thing that has changed, or a diff bringing the code one
step forward to a better, working state.

4) Once your commit is nice and clean, and you want to *discard the other
changes*, you can use `git checkout .` (that will erase changes to
tracked files) and `git clean [-i/--interactive]` (to erase untracked
files).  **However, be careful with those commands, as their function
is to erase things/changes.**


### Tests
Please ensure all the tests pass:

```shell
$ yarn test # headless Firefox
$ BROWSERS=Firefox yarn test
$ BROWSERS=Firefox,Chrome yarn test
$ BROWSERS=Firefox,Chrome,Safari yarn test
```

### Local environment
To run locally:

```shell
$ yarn start
```

You can then run the examples in `http://localhost:8000/examples/`.

However, be careful not to add the `dist/` files in your commit, as
Grunt automatically regenerates the files in `dist/` as the source is
changed.
