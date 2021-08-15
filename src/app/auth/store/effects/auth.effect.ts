import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as actions from '../actions/auth.action'


@Injectable()
export class AuthEffect {

    constructor(
       private actions$: Actions,
       private authService : AuthService
    ){}


    AuthEffect$ = createEffect(
        ():any  => this.actions$.pipe(
             ofType( actions.identificarUsuario ),
             mergeMap( 
                 ( action ) => this.authService.login( action.email, action.password ).pipe(
                     map( auth => actions.identificarUsuarioSuccess( { auth: {...auth } } ) ),
                     catchError( error => of(actions.identificarUsuarioError( { payload: {...error} } ) ) )
                 )
             ) 
        )
   );
}