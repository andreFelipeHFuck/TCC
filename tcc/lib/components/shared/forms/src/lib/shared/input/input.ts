import { Component, computed, inject, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Logger } from '@tcc/types';

import { 
  FormAppearance, 
  FormType 
} from '@tcc/types';

@Component({
  selector: 'lib-input',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input {
  private readonly logger = inject(Logger);

  label = input<string>('Email');
  placeholder = input<string>('email@teste.com');
  control = input.required<FormControl>();
  type = input<FormType>('email');
  appearance = input<FormAppearance>('outline');

  hidePassword = true;

  errorMessage = computed(() => {
    const ctrl = this.control();

    this.logger.info('Teste');
    this.logger.info(`${ctrl.hasError('required')}`);

    if (!ctrl) return '';
   
    if (ctrl.hasError('email')) return 'E-mail inválido';
    if (ctrl.hasError('required')) return 'Campo obrigatório';
    if (ctrl.hasError('minlength')) {
      const min = ctrl.getError('minlength').requiredLength;
      return `Mínimo de ${min} caracteres`;
    }
    return 'Campo inválido';
  });
}
