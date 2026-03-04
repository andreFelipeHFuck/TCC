import { InjectionToken } from "@angular/core";

import { AppwriteConfig } from "@tcc/types";

export const APPWRITE_CONFIG = new InjectionToken<AppwriteConfig>('APPWRITE_CONFIG');
