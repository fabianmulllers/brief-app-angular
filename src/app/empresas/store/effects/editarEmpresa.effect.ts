import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { EmpresasService } from '../../services/empresas.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { empresa } from '../../../interfaces/empresa.interface';
import { of } from 'rxjs';


@Injectable()
export class editarEmpresaEffect {

    constructor(
       private actions$: Actions,
       private empresasService: EmpresasService
    ){}


    editarEmpresaEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.editarEmpresa ),
            mergeMap( 
                ( action ) => this.empresasService.editarEmpresa( action.id, action.nombre ).pipe(
                    map( ( empresa: empresa) => actions.editarEmpresaSuccess( { empresa: { ... empresa } } ) ),
                    catchError( ( error ) => of( actions.editarEmpresaError( { payload: { ... error } } ) ) ) 
                )
            )
        )
   );
}

