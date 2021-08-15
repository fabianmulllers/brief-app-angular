import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { UsuariosService } from '../../services/usuarios.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/auth.interface';
import { of } from 'rxjs';


@Injectable()
export class ObtenerUsuarioEditarEffect {

    constructor(
       private actions$: Actions,
       private usuariosService : UsuariosService
    ){}


    obtenerUsuarioEditarEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.showEditar ),
            mergeMap( 
                ( action ) => this.usuariosService.obtenerUsuario( action.id ).pipe(
                    map( ( usuario: Usuario ) => actions.showEditarSuccess( { usuario: { ...usuario } } ) ),
                    catchError( (error) => of( actions.showEditarError( { payload: { ...error } } ) ) )
                )
            )
        )
   );
}

