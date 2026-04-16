import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@tcc/components/buttons';

@Component({
  selector: 'lib-navbar',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuItems = [
    { label: 'Home', icon: 'home', route: '/home' },
    { label: 'Histórico', icon: 'history', route: '/history' },
    { label: 'Recargas', icon: 'bolt', route: '/recharges' },
    { label: 'Eletropostos', icon: 'ev_station', route: '/stations' },
  ];

  selectedItem = signal('Home');

  selectItem(label: string) {
    this.selectedItem.set(label);
  }
}
