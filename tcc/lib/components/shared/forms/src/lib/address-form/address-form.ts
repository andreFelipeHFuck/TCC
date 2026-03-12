import { 
  Component, 
  inject, 
  output 
} from '@angular/core';
import { 
  FormControl, 
  FormGroup,
} from '@angular/forms';

import { Address } from '@tcc/types';

import { Input } from '../shared/input/input';
import { RegisterService } from '../services/register-service';

@Component({
  selector: 'lib-address-form',
  imports: [
    Input
  ],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {
  private registerService = inject(RegisterService);

  formResult = output<Address>();

  cepControl() {
    const addressGroup = this.registerService.registerForm.controls['address'] as FormGroup;
    return addressGroup.controls['cep'] as FormControl;
  }

  stateControl() {
    const addressGroup = this.registerService.registerForm.controls['address'] as FormGroup;
    return addressGroup.controls['state'] as FormControl;
  }

  cityControl() {
    const addressGroup = this.registerService.registerForm.controls['address'] as FormGroup;
    return addressGroup.controls['city'] as FormControl;
  }

  neighborhoodControl() {
    const addressGroup = this.registerService.registerForm.controls['address'] as FormGroup;
    return addressGroup.controls['neighborhood'] as FormControl;
  }

  streetControl() {
    const addressGroup = this.registerService.registerForm.controls['address'] as FormGroup;
    return addressGroup.controls['street'] as FormControl;
  }

  numStreetControl() {
    const addressGroup = this.registerService.registerForm.controls['address'] as FormGroup;
    return addressGroup.controls['numStreet'] as FormControl;
  }
}
