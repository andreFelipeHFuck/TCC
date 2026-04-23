import { Provider } from "@angular/core";

import { 
  AppwriteConfig, 
  AUTH_DRIVER, 
  DATABASE_DRIVER, 
  AUTH_SERVICE,
  AUTH_GRPC_DRIVER
} from "@tcc/types";
import { AuthSystem, CsmsSystem } from "@tcc/core";

import { APPWRITE_CONFIG, APPWRITE_DATABASE_ID } from './appwrite-connections/appwrite-token'; 

import { Appwrite } from "./appwrite";
import { Auth } from "./auth/auth";
import { DatabaseUser } from "./database/database-user";
import { AuthGrpc } from "./functions/grpc/auth/auth-grpc";

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
    {
      provide: AUTH_GRPC_DRIVER,
      useClass: AuthGrpc,
    },
    // O sistema central agora usa o AuthSystem do Core
    {
      provide: AUTH_SERVICE, // Agora o Token substitui a interface
      useClass: AuthSystem,
    },
    // Registrar o novo CsmsSystem agnóstico
    CsmsSystem
  ];
}
