import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { UsuariosService } from 'src/app/usuarios/services/usuarios.service';
import { Usuarios } from 'src/app/interfaces/usuario.interface';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffect {

    constructor(
       private actions$: Actions,
       private usuariosService: UsuariosService
    ){}


    UsuariosEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.obtenerUsuarios ),
            tap( console.log ),
            mergeMap( 
                () => this.usuariosService.obtenerUsuarios()
                .pipe(
                    map( ( usuarios:Usuarios[] ) => actions.obtenerUsuariosSuccess( { usuarios: usuarios } ) ),
                    catchError( ( error) => of( actions.obtenerUsuariosError( {payload: {... error} } ) ))
                )
            )    
        )
   );
}

