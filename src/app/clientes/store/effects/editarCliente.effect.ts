import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { ClientesService } from '../../services/clientes.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Cliente } from '../../../interfaces/clientes.interface';
import { of } from 'rxjs';


@Injectable()
export class editarClienteEffect {

    constructor(
       private actions$: Actions,
       private clientesService: ClientesService
    ){}


    editarClienteEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.editarCliente ),
            mergeMap( 
                ( action ) => this.clientesService.editarCliente( action.id, action.nombre, action.empresa ).pipe(
                    map( ( cliente: Cliente ) => actions.agregarClienteSuccess( { cliente: {... cliente } } ) ),
                    catchError( error => of(actions.editarClienteError( { payload: { ...error } } ) ) )
                )
            )
        )
   );
}

