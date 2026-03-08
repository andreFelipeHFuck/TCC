import { Component, input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  title = input.required<string>();
}
