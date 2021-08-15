import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RolesService } from '../../services/roles.service';
import { Role } from 'src/app/interfaces/roles.interface';


@Injectable()
export class obtenerRoleEditarEffect {

    constructor(
       private actions$: Actions,
       private rolesService: RolesService
    ){}


    obtenerRoleEditarEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.modalEditar ),
            mergeMap(
                ( action ) => this.rolesService.obtenerRole( action.id ).pipe(
                    map( ( role: Role ) => actions.modalEditarSuccess( { role: { ... role } } ) ),
                    catchError( ( error ) =>  of(actions.modalEditarError( { payload: { ...error }  } ) ) )
                )

            )
        )
   );
}

