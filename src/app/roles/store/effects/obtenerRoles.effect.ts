import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RolesService } from '../../services/roles.service';
import * as actions from '../actions';
import { Role } from '../../../interfaces/roles.interface';


@Injectable()
export class obtenerRolesEffect {

    constructor(
       private actions$: Actions,
       private rolesService: RolesService
    ){}


    obtenerRolesEffect$ = createEffect(
        ():any  => this.actions$.pipe(
             ofType( actions.obtenerRoles ),
             mergeMap( 
                () => this.rolesService.obtenerRoles().pipe(
                    map( ( roles: Role[] ) => actions.obtenerRolesSuccess( { roles: roles } ) ),
                    catchError( ( error ) => of( actions.obtenerRolesError( { payload: { ... error } } ) ) )
                )
             )
        )
   );
}

