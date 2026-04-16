import { Component, input } from '@angular/core';

import { Header } from '@tcc/components/header';
import { Navbar } from '@tcc/components/navbar';

@Component({
  selector: 'lib-desktop-page',
  imports: [
    Header,
    Navbar
  ],
  templateUrl: './desktop-page.html',
  styleUrl: './desktop-page.scss',
})
export class DesktopPage {
  navbar = input<boolean>(true);
  header = input<boolean>(true);
}
