import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { EmpresasService } from '../../services/empresas.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { empresa } from '../../../interfaces/empresa.interface';
import { of } from 'rxjs';


@Injectable()
export class agregarEmpresaEffect {

    constructor(
       private actions$: Actions,
       private empresasService: EmpresasService
    ){}


    agregarEmpresaEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.agregarEmpresa ),
            mergeMap( 
                ( action ) => this.empresasService.agregarEmpresa( action.nombre ).pipe(
                    map( ( empresa: empresa) => actions.agregarEmpresaSuccess( { empresa: { ... empresa } } ) ),
                    catchError( ( error ) => of( actions.agregarEmpresaError( { payload: { ... error } } ) ) ) 
                )
            )
        )
   );
}

