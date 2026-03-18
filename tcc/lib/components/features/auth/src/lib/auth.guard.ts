import { inject } from '@angular/core';
import { Router } from '@angular/router';

// export const guestGuard = () => {
//     const router = inject(Router);

//     return router.parseUrl('/../../');
// }

export const authGuard = () => {
    const router = inject(Router);

    return router.parseUrl('/auth/login');
}