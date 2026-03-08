import { Component } from '@angular/core';

import { Button } from "@tcc/components/buttons"

@Component({
  selector: 'lib-auth',
  imports: [
    Button
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {}
