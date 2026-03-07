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
import { LOGGER_PROVIDER } from '../providers/logger.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),

    LOGGER_PROVIDER,

    ...appwriteProvide({
      endpoint: environment.appwrite.endpoint,
      project: environment.appwrite.projectId,
      databaseId: environment.appwrite.databaseId
    }),

    provideAppInitializer(() => {
      const service = inject(Appwrite);
      return service.init();
    })
  ],
};
