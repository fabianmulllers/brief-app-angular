import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errores'
})
export class ErroresPipe implements PipeTransform {

  transform(errores: any): any {
    
    if( errores.errors ) {
        
        let cadena_errores = ''
        for (const err of errores.errors) {
          cadena_errores += `<p>${ err.msg } </p>`
        }  

        return cadena_errores;
    }


    if( errores.msg ){
      return `<p>${ errores.msg }<p>`;
    }

    return `<p> Ocurrio un problema, intentalo mas tarde. </p>`

  }

}
