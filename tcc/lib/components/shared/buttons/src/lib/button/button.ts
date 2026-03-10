import { Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { 
  ButtonType,
  ButtonColor
} from '@tcc/types';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule
  ],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  typeButton = input<ButtonType>('standard');
  title = input.required<string>();
  color = input<ButtonColor>('primary');
  icon = input<string>();
}
