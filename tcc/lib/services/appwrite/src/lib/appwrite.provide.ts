import { Provider } from "@angular/core";

import { AppwriteConfig } from "@tcc/types";

import { APPWRITE_CONFIG } from './appwrite-connections/appwrite-token.token';
import { Appwrite } from "./appwrite";

export function appwriteProvide(
  config: AppwriteConfig
): Provider[] {
  return [
    Appwrite,
    {
      provide: APPWRITE_CONFIG,
      useValue: config,
    },
  ];
}