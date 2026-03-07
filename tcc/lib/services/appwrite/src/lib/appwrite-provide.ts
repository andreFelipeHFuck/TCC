import { Provider } from "@angular/core";

import { AppwriteConfig } from "@tcc/types";

import { APPWRITE_CONFIG, APPWRITE_DATABASE_ID } from './appwrite-connections/appwrite-token';
import { Appwrite } from "./appwrite";

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
    }
  ];
}