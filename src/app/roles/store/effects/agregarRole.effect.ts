import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import * as actions from '../actions';
import { of } from 'rxjs';
import { RolesService } from '../../services/roles.service';
import { Role } from '../../../interfaces/roles.interface';


@Injectable()
export class agregarRoleEffect {

    constructor(
       private actions$: Actions,
       private rolesService: RolesService
    ){}


    agregarRoleEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.agregarRole ),
            mergeMap( 
                ( action ) => this.rolesService.agregarRole( action.nombre ).pipe(

                    map( (role: Role) => actions.agregarRoleSuccess( { role: { ...role } } ) ),
                    catchError( error => of(actions.agregarRoleError( { payload: { ...error } } ) ) ) 

                )
            )
        )
   );
}

