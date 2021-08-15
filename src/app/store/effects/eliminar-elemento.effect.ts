import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from '../actions';
import { EliminarElementoService } from '../../shared/service/eliminar-elemento.service';
import { of } from 'rxjs';


@Injectable()
export class EliminarEffect {

    constructor(
       private actions$: Actions,
       private eliminarElementoService : EliminarElementoService
    ){}


    eliminarEffect$ = createEffect(
        ():any  => this.actions$.pipe(
             ofType( actions.eliminarElemento ),
             mergeMap( 
                 ( action ) => this.eliminarElementoService.eliminarElemento( action.id, action.elemento ).pipe(
                    map( ( exito:any ) => actions.eliminarElementoSuccess( { exito: { ...exito } })  ),
                    catchError( ( error ) => of(actions.eliminarElementoError( { payload: { ...error } } ) ) )
                 )
             )
        )
   );
}

