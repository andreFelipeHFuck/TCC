import {
  Injectable,
  inject
} from '@angular/core';

import { Appwrite } from '../appwrite';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly appwrite: Appwrite = inject(Appwrite);

  create() { }

  login() { }

  logout() { }

  initSessionProxy() { }

  finishSessionProxy() { }
}
