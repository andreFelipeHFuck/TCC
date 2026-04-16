import { Component, input } from '@angular/core';

import { LiProfileImage } from '@tcc/components/li-profile-image';
import { UserInfo } from '@tcc/components/user-info';

interface MenuItem {
  label: string,
  icon: string,
  action: () => void,
}

@Component({
  selector: 'lib-toggle-menu',
  imports: [
    LiProfileImage, 
    UserInfo
  ],
  templateUrl: './toggle-menu.html',
  styleUrl: './toggle-menu.scss',
})
export class ToggleMenu {
  isMenuOpen = input<boolean>(false);
  
  name = input.required<string>();
  addInfo = input.required<string>();

  public readonly menuItems: MenuItem[] = [
    {
      label: 'Pefil',
      icon: 'person',
      action: () => {
        console.log('Perfil');
      }
    },
    {
      label: 'Sair',
      icon: 'logout',
      action: () => {
        console.log('Sair');
      }
    }
  ]
}
