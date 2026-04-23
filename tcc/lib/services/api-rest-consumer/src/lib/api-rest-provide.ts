import { Provider } from "@angular/core";
import { 
  AUTH_DRIVER, 
  DATABASE_DRIVER,
  AUTH_GRPC_DRIVER,
  AUTH_SERVICE
} from "@tcc/types";

import { AuthSystem, CsmsSystem } from "@tcc/core";
import { AuthGrpc } from "@tcc/appwrite";

import { Auth } from "./auth/auth";
import { DatabaseUser } from "./database/database-user";


export function apiRestProvide(): Provider[] {
  return [
    // 1. Drivers locais da ApiRest
    {
      provide: AUTH_DRIVER,
      useClass: Auth,
    },
    {
      provide: DATABASE_DRIVER,
      useClass: DatabaseUser,
    },

    // 2. Driver de gRPC (Mantendo compatibilidade com o Core)
    {
      provide: AUTH_GRPC_DRIVER,
      useClass: AuthGrpc, 
    },

    // 3. Serviços do Core 
    {
      provide: AUTH_SERVICE,
      useClass: AuthSystem,
    },
    CsmsSystem
  ];
}
