---
title: Contributing
tags: docs
---


### Pull Requests

If you're motivated to fix a bug or to develop a new feature, we'd love to see your code.
When submitting pull requests, please remember the following:

<ul>
<li><strong>Make sure tests pass</strong><br/>Run <kbd>npm test</kbd> to make sure your changes don't break existing functionality</li>
<li><strong>Do not make changes to files in /dist</strong><br/> Limiting your edits to files in /src or /doc_src directories keeps the size of your pull request down and makes it easier for us to evaluate. We'll update the /dist folder after your pull request is approved.</li>
<li><strong>Add tests</strong><br/>In the best case scenario, you are also adding tests to back up your changes, but don't sweat it if you don't. We can discuss them at a later date.</li>
</ul>

### Build from source
Compile TypeScript and SCSS in the /src directory to JavaScript and CSS in the /buid directory

```shell
$ npm run build
```

### Functional and Unit Tests
Please ensure all the tests pass:

```shell
$ npm test
```

### Local Environment
Runing ```npm start``` on your repo will start a web server allowing you to view a local copy of tom-select.js.org.

```shell
$ npm start
```

Once started, you can run all the examples at `http://localhost:8000/`.
