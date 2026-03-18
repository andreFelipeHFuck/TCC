import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthUser } from '@tcc/appwrite';

export const guestGuard = async () => {
    const router = inject(Router);
    const authUser = inject(AuthUser);

    const isLoggeIn = await authUser.isLoggedIn();

    if(isLoggeIn) {
        return router.parseUrl('/');
    }

    return true;
}

export  const authGuard = async () => {
    const router = inject(Router);
    const authUser = inject(AuthUser);

    const isLoggeIn = await authUser.isLoggedIn();

    if(isLoggeIn) {
        return true;
    }

    return router.parseUrl('/auth/login');
}