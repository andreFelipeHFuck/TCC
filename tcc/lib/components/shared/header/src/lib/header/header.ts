import { 
  input, 
  Component, 
  signal,
  inject,
  ElementRef,
  HostListener
} from '@angular/core';

import { LiProfileImage } from '@tcc/components/li-profile-image';
import { UserInfo } from '@tcc/components/user-info';
import { ToggleMenu } from '@tcc/toggle-menu';

@Component({
  selector: 'lib-header',
  imports: [
    LiProfileImage, 
    UserInfo,
    ToggleMenu
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private elementRef = inject(ElementRef);

  completeHeader = input<boolean>(true);

  isMenuOpen = signal<boolean>(false);

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen.set(false);
    }
  }
}
