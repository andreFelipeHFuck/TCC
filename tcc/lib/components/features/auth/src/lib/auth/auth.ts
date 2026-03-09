import { Component } from '@angular/core';

import { Title } from '@tcc/components/title';
import { Button } from "@tcc/components/buttons"
import { Auth as AuthForm } from "@tcc/components/forms"

@Component({
  selector: 'lib-auth',
  imports: [
    Title,
    Button,
    AuthForm
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {}
