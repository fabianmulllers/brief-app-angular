import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { EmpresasService } from '../../services/empresas.service';
import { empresa } from '../../../interfaces/empresa.interface';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class ObtenerEmpresasEffect {

    constructor(
       private actions$: Actions,
       private empresasService: EmpresasService
    ){}


    obtenerEmpresasEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.obtenerEmpresas ),
            mergeMap( 
                () => this.empresasService.obtenerEmpresas().pipe(
                    map( ( empresas: empresa[]) => actions.obtenerEmpresasSuccess( { empresas: empresas  } ) ),
                    catchError( error => of(actions.obtenerEmpresasError( { payload: { ... error } } ) ) )
                )
            )
        )
   );
}

