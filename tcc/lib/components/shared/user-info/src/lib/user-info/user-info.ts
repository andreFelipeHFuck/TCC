import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-user-info',
  imports: [],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo {
  name = input.required<string>();
  addInfo = input.required<string>();
}
