import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from '../environments/environment';
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const msalConfig: Configuration = {
    auth: {
        clientId: environment.uiClienId, // This is the ONLY mandatory field that you need to supply.
        authority: 'https://login.microsoftonline.com/' + environment.tenantId, // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: '/', // Points to window.location.origin. You must register this URI on Azure portal/App Registration.
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log('X=>',message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

export const protectedResources = {
    todoListApi: {
        endpoint: "https://localhost:7299/",////API URL //"https://localhost:7044/api",//
        scopes: ["api://15721ae2-7a91-4d71-a580-b1e13e9961c9/Api.Read"]
    },
}

export const loginRequest = {
    scopes: ["email"]
  };

