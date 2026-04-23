import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  User
} from '@tcc/types';
import { AuthUser } from '../auth/auth-user';

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private readonly authUser = inject(AuthUser);

  private userState = signal<User | null>(null);


}
