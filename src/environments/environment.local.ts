// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  envName: 'local',
  serverPath: 'http://localhost:57276/',
  assetUrl: 'api/asset/assets',
  marketUrl: 'api/asset/getMarket',
  tokenIssuerClient: "http://localhost:57276/",
  tokenIssuerPath: "http://localhost:57276/"
  // tokenIssuerClient: "https://devutportal.utilimap.com",
  // tokenIssuerPath: "https://wadevutportal.utilimap.com"
};