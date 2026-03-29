import { Provider } from "@angular/core";

import { 
  AppwriteConfig, 
  AUTH_DRIVER, 
  DATABASE_DRIVER, 
  AUTH_SERVICE 
} from "@tcc/types";
import { AuthSystem } from "@tcc/core";

import { APPWRITE_CONFIG, APPWRITE_DATABASE_ID } from './appwrite-connections/appwrite-token';
import { Appwrite } from "./appwrite";
import { Auth } from "./auth/auth";
import { DatabaseUser } from "./database/database-user";

export function appwriteProvide(
  config: AppwriteConfig,
): Provider[] {
  return [
    Appwrite,
    {
      provide: APPWRITE_CONFIG,
      useValue: config,
    },
    {
      provide: APPWRITE_DATABASE_ID,
      useValue: config.databaseId,
    },
    // Registrar os drivers agnósticos usando as implementações do Appwrite
    {
      provide: AUTH_DRIVER,
      useClass: Auth,
    },
    {
      provide: DATABASE_DRIVER,
      useClass: DatabaseUser,
    },
    // O sistema central agora usa o AuthSystem do Core
    {
      provide: AUTH_SERVICE, // Agora o Token substitui a interface
      useClass: AuthSystem,
    }
  ];
}