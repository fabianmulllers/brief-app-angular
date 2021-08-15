import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { ClientesService } from '../../services/clientes.service';
import * as actions from '../actions';
import { Cliente } from '../../../interfaces/clientes.interface';
import { of } from 'rxjs';


@Injectable()
export class agregarClienteEffect {

    constructor(
       private actions$: Actions,
       private clientesService: ClientesService
    ){}


    agregarClienteEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.agregarCliente ),
            mergeMap( 
                ( action ) => this.clientesService.agregarCliente( action.nombre, action.empresa ).pipe(

                    map( (cliente: Cliente) => actions.agregarClienteSuccess( { cliente: { ...cliente } } ) ),
                    catchError( error => of(actions.agregarClienteError( { payload: { ...error } } ) ) ) 

                )
            )
        )
   );
}

