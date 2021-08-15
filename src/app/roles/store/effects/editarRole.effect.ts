import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RolesService } from '../../services/roles.service';
import { Role } from 'src/app/interfaces/roles.interface';



@Injectable()
export class editarRoleEffect {

    constructor(
       private actions$: Actions,
       private rolesService: RolesService
    ){}


    editarRoleEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.editarRole ),
            mergeMap( 
                ( action ) => this.rolesService.editarRole( action.id, action.nombre ).pipe(
                    map( ( role: Role ) => actions.agregarRoleSuccess( { role: { ...role } } ) ),
                    catchError( error => of(actions.editarRoleError( { payload: { ...error } } ) ) )
                )
            )
        )
   );
}

