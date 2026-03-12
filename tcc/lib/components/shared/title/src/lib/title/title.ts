import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class Title {
  title = input.required<string>();
}
