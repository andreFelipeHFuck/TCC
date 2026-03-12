import { Route } from '@angular/router';

import { User } from './user/user';

export const appRoutes: Route[] = [
    {
        path: '',
        component: User

    },
    {
        path: 'auth',
        loadChildren: () => import('@tcc/auth').then(m => m.authRoutes)
    }
];
