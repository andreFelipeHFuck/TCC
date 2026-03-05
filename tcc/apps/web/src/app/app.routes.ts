import { Route } from '@angular/router';
import { User } from './user/user';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
    },
    {
        path: 'user',
        component: User
    }
];
