import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { environment } from '../environments/environments';

import { 
  Appwrite,
  appwriteProvide 
} from '@tcc/appwrite'
import { apiRestProvide } from '@tcc/api-rest-consumer';

import { LOGGER_PROVIDER } from '../providers/logger.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),

    LOGGER_PROVIDER,

    // ...appwriteProvide({
    //   endpoint: environment.appwrite.endpoint,
    //   projectId: environment.appwrite.projectId,
    //   databaseId: environment.appwrite.databaseId
    // }),
    ...apiRestProvide(),

    // provideAppInitializer(() => {
    //   const service = inject(Appwrite);
    //   return service.init();
    // })
  ],
};
