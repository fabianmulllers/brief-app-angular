import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  passwordMatch( password: string, confirmPassword: string ) {

    return ( FormGroup: AbstractControl ) :ValidationErrors | null => {
        
      const pass = FormGroup.get( password )?.value;
      const confirmPass = FormGroup.get( confirmPassword )?.value

      if( pass !== confirmPass){
         
        FormGroup.get( confirmPassword )?.setErrors({ confirmPassword: 'El password no coincide con el ingresado' });
        return { confirmPassword: 'El password no coincide con el ingresado' }
      }
      
      return null
    }

  }
}
