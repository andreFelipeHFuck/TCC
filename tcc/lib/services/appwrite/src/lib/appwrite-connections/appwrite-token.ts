import { InjectionToken } from "@angular/core";

import { AppwriteConfig } from "@tcc/types";

export const APPWRITE_CONFIG = new InjectionToken<AppwriteConfig>('APPWRITE_CONFIG');
export const APPWRITE_DATABASE_ID = new InjectionToken<string>('APPWRITE_DATABASE_ID');
