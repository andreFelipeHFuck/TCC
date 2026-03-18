import { Route } from '@angular/router';

import { authGuard } from '@tcc/auth';

import { User } from './user/user';

export const appRoutes: Route[] = [
    {
        path: '',
        component: User,
        canActivate: [authGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('@tcc/auth').then(m => m.authRoutes)
    }
];
