import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_SERVICE } from '@tcc/types';

export const guestGuard = async () => {
    const router = inject(Router);
    const authService = inject(AUTH_SERVICE);

    const isLoggedIn = await authService.isLoggedIn();

    // Se o usuário já estiver logado (diferente de 'NONE'), ele não pode acessar rotas de guest (login/register)
    if(isLoggedIn !== 'NONE') {
        return router.parseUrl('/');
    }

    return true;
}

export const authGuard = async () => {
    const router = inject(Router);
    const authService = inject(AUTH_SERVICE);

    const isLoggedIn = await authService.isLoggedIn();

    // Se o usuário estiver logado (diferente de 'NONE'), ele pode acessar a rota protegida
    if(isLoggedIn !== 'NONE') {
        return true;
    }

    // Se não estiver logado, redireciona para o login
    return router.parseUrl('/auth/login');
}
