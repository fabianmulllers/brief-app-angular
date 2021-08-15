import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { UsuariosService } from '../../services/usuarios.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from '../../../interfaces/auth.interface';


@Injectable()
export class UsuarioEffect {

    constructor(
       private actions$: Actions,
       private usuarioService: UsuariosService
    ){}


    usuarioEffect$ = createEffect(
        ():any  => this.actions$.pipe(
             ofType( actions.agregarUsuario ),
             mergeMap( 
                 ( action ) => this.usuarioService.agregarUsuario(  action.usuario  ).pipe(
                     map( ( usuario: Usuario) => actions.agregarUsuarioSuccess({ usuario: { ...usuario } } ) ),
                     catchError( (error) => of(actions.agregarUsuarioError( { payload: { ...error } } ) ) )
                 )
             )
        )
   );
}

