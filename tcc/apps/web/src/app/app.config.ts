import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { environment } from '../environments/environments';

import { Appwrite, appwriteInitializer, appwriteProvide } from '@tcc/appwrite'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),

    ...appwriteProvide({
      endpoint: environment.appwrite.endpoint,
      project: environment.appwrite.projectId,
    }),

    provideAppInitializer(() => {
      const service = inject(Appwrite);
      return service.init();
    })
  ],
};
