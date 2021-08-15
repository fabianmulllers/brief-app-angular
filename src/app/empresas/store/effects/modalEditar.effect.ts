import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { EmpresasService } from '../../services/empresas.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { empresa } from '../../../interfaces/empresa.interface';
import { of } from 'rxjs';


@Injectable()
export class modalEditarEffect {

    constructor(
       private actions$: Actions,
       private empresasService: EmpresasService
    ){}


    modalEditarEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.modalEditar  ),
            mergeMap( 
                ( action ) => this.empresasService.obtenerEmpresa( action.id ).pipe(
                    map( ( empresa: empresa ) => actions.modalEditarSuccess( { empresa: { ... empresa } } ) ),
                    catchError( ( error ) => of( actions.modalEditarError( { payload: { ...error } } ) ) )
                )
            )
        )
   );
}

