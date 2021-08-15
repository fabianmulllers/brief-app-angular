import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from '../actions';
import { ClientesService } from '../../services/clientes.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Cliente } from '../../../interfaces/clientes.interface';
import { of } from 'rxjs';


@Injectable()
export class obtenerClienteEditarEffect {

    constructor(
       private actions$: Actions,
       private clientesService: ClientesService
    ){}


    obtenerClienteEditarEffect$ = createEffect(
        ():any  => this.actions$.pipe(
            ofType( actions.modalEditar ),
            mergeMap(
                ( action ) => this.clientesService.obtenerCliente( action.id ).pipe(
                    map( ( cliente: Cliente ) => actions.modalEditarSuccess( { cliente: { ... cliente } } ) ),
                    catchError( ( error ) =>  of(actions.modalEditarError( { payload: { ...error }  } ) ) )
                )

            )
        )
   );
}

