// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  port: 4200,
  stripePublicKey: 'pk_test_bGJ5RVsj5l16BfM8zCHc0ln3',
  //url: 'http://haumea.bvblogic.net:8103'
  //url: 'http://10.100.0.124:1337'
  url: 'http://vm103.bvblogic.net',
  // url: 'http://127.0.0.1:1337',
};
