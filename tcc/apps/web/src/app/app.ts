import { Component, inject } from '@angular/core';
import { AUTH_SERVICE } from '@tcc/types';

import { environment } from '../environments/environments';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    // Expõe o serviço de autenticação no console (window.auth) para debugging em modo dev
    if (!environment.production) {
      (window as any).auth = inject(AUTH_SERVICE);
    }
  }
}
