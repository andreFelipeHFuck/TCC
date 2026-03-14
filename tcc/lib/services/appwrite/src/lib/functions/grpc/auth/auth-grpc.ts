import { Injectable } from '@angular/core';
import { Appwrite } from '../../../appwrite';
import { AppwriteServices } from '@tcc/types';

@Injectable({
  providedIn: 'root',
})
export class AuthGrpc extends Appwrite
 {
  constructor() {
    super();
    this.service = AppwriteServices.FUNCTIONS;
  }
}
