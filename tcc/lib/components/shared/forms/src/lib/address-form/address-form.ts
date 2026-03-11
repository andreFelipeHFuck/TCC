import { Component, inject, output } from '@angular/core';
import { 
  FormBuilder,
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators
} from '@angular/forms';

import { Address } from '@tcc/types';

import { Input } from '../shared/input/input';
import { Button } from '@tcc/components/buttons';

@Component({
  selector: 'lib-address-form',
  imports: [
    ReactiveFormsModule,
    Input,
    Button,
  ],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {
  private fb: FormBuilder = inject(FormBuilder);

  formResult = output<Address>();

  addressForm: FormGroup = this.fb.group({
     address: this.fb.group({
      cep: new FormControl('', [
        Validators.required, 
        Validators.minLength(8), 
        Validators.maxLength(8)
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      neighborhood: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      numStreet: new FormControl('', [
        Validators.required
      ])
    })
  });

  cepControl() {
    const userGroup = this.addressForm.controls['address'] as FormGroup;
    return userGroup.controls['cep'] as FormControl;
  }

  cityControl() {
    const userGroup = this.addressForm.controls['address'] as FormGroup;
    return userGroup.controls['city'] as FormControl;
  }

  neighborhoodControl() {
    const userGroup = this.addressForm.controls['address'] as FormGroup;
    return userGroup.controls['neighborhood'] as FormControl;
  }

  streetControl() {
    const userGroup = this.addressForm.controls['address'] as FormGroup;
    return userGroup.controls['street'] as FormControl;
  }

  numStreetControl() {
    const userGroup = this.addressForm.controls['address'] as FormGroup;
    return userGroup.controls['numStreet'] as FormControl;
  }

  onSubmit(){
    if (this.addressForm.valid) {
      const value = this.addressForm.value;
      this.formResult.emit(value);
    }
  }
}
