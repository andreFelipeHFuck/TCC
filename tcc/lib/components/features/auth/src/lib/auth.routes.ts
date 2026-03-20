import { Routes } from '@angular/router';

import { Auth } from './auth/auth';
import { Register } from './register/register';
import { guestGuard } from './auth.guard';

export const authRoutes: Routes = [
    {
        path: 'login',
        component: Auth,
        //canActivate: [guestGuard]
    },
    {
        path: 'register',
        component: Register,
        //canActivate: [guestGuard]
    },
]