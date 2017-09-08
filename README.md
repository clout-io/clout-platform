Clout Network
=============


## Requirements

The minimum requirement by this application template that your Web server supports:

1. Node.js v8.1.4


## Branching

- master - stable sources deployed to production env
- develop - current unstable sources deployed to development env
- JIRA-ID - branch to implement feature or to fix issue listed in Jira

All the development should be done at JIRA-ID branch.
After finishing development you should create pull request to develop branch.


## Project structure

```
dist/                        compiled version
e2e/                         end-to-end tests
node_modules/                node packages
src/                         project source code
|- app/                      app components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- index.html                html entry point
|- styles.scss               global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
|- server.ts                 app entry point for server rendering
|- test.ts                   unit tests entry point
```


## Main tasks

Tasks                         | Description
------------------------------|---------------------------------------------------------------------------------------
npm run start:server_ng       | Run production version
npm start                     | Run development server on `http://localhost:4200/`
npm test                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode
npm run e2e                   | Run e2e tests using [Protractor](http://www.protractortest.org)
npm run lint                  | Lint code


### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.


### Code scaffolding

Run `npm run generate -- component <name>` to generate a new component. You can also use
`npm run generate -- directive|pipe|service|class|module`.

If you have installed [angular-cli](https://github.com/angular/angular-cli) globally with `npm install -g @angular/cli`,
you can also use the command `ng generate` directly.


### Additional tools

Tasks are mostly based on the `angular-cli` tool. Use `ng help` to get more help or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).


## Coding guides

- [HTML](docs/coding-guides/html.md)
- [SASS](docs/coding-guides/sass.md)
- [TypeScript](docs/coding-guides/typescript.md)
