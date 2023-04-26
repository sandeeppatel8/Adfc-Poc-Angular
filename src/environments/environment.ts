// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "https://localhost:7299/",
  graphUrl: 'https://graph.microsoft.com/User.Read',
  scopeUri: ["api://15721ae2-7a91-4d71-a580-b1e13e9961c9/Api.Read"],
  tenantId: "73f2e714-a32e-4697-9449-dffe1df8a5d5",
  uiClienId: "a83c605c-5f70-426b-9b21-bc3d3b9deae6",
  redirectUrl: "http://localhost:4200/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
