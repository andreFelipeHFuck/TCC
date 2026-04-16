import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'lib-li-profile-image',
  imports: [],
  templateUrl: './li-profile-image.html',
  styleUrl: './li-profile-image.scss',
})
export class LiProfileImage {
  public srcStandard = '/profile-generic-icon.svg';

  src = input<string>('');

  srcIsEmpty =  computed(() => this.src() === '');
}
