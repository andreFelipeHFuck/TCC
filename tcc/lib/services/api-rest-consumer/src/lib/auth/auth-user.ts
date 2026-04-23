import { Injectable } from "@nestjs/common";

import { AuthService } from "@tcc/types";



@Injectable({
  providedIn: 'root',
})
export class AuthUser implements AuthService {
    protected service = '[APPWRITE USER AUTH SERVICE]'
}
