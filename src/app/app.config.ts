import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';

registerLocaleData(localeCs);

export function createTranslateLoader(httpClient: HttpClient) {
  return {
    getTranslation: (lang: string) => {
      return httpClient.get(`assets/i18n/${lang}.json`);
    }
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'cs' },
    provideNativeDateAdapter(),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
};
