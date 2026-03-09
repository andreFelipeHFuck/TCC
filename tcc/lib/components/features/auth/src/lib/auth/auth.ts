import { Component } from '@angular/core';

import { Title } from '@tcc/components/title';
import { Button } from "@tcc/components/buttons"

@Component({
  selector: 'lib-auth',
  imports: [
    Title,
    Button
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {}
