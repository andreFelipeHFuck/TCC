import { Routes } from '@angular/router';

import { Auth } from './auth/auth';
import { Register } from './register/register';

export const authRoutes: Routes = [
    { path: 'login', component: Auth },
    { path: 'register', component: Register },
]