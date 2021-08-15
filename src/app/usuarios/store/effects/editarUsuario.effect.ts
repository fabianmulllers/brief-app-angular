import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { UsuariosService } from '../../services/usuarios.service';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from '../../../interfaces/auth.interface';


@Injectable()
export class EditarUsuarioEffect {

    constructor(
       private actions$: Actions,
       private usuarioService: UsuariosService
    ){}


    editarUsuarioEffect$ = createEffect(
        ():any  => this.actions$.pipe(
             ofType( actions.editarUsuario ),
             mergeMap( 
                 ( action ) => this.usuarioService.editarUsuario(  action.usuario  ).pipe(
                     map( ( usuario: Usuario) => actions.editarUsuarioSuccess({ usuario: { ...usuario } } ) ),
                     catchError( (error) => of(actions.editarUsuarioError( { payload: { ...error } } ) ) )
                 )
             )
        )
   );
}

