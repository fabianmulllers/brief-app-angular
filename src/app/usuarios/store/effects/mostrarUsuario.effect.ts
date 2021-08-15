import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from '../actions';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/interfaces/auth.interface';
import { of } from 'rxjs';


@Injectable()
export class MostrarUsuarioEffect {

    constructor(
       private actions$: Actions,
       private usuarioService: UsuariosService
    ){}


    mostrarUsuarioEffect$ = createEffect(
        ():any  => this.actions$.pipe(
             ofType( actions.mostrarUsuario ),
             mergeMap( 
                ( action ) => this.usuarioService.obtenerUsuario( action.id ).pipe(
                    map( ( usuario: Usuario) => actions.mostrarUsuarioSuccess( { usuario: { ...usuario } } ) ),
                    catchError( error => of( actions.obtenerUsuariosError( { payload: { ...error } }) ) )
                ) 
             )
        )
   );
}

