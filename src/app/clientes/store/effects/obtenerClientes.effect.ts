import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import { ClientesService } from '../../services/clientes.service';
import * as actions from '../actions';


@Injectable()
export class obtenerClientesEffect {

    constructor(
       private actions$: Actions,
       private clienteService: ClientesService
    ){}


    obtenerClientesEffect$ = createEffect(
        ():any  => this.actions$.pipe(
             ofType( actions.obtenerClientes ),
             mergeMap( 
                () => this.clienteService.obtenerClientes().pipe(
                    map( ( clientes: Cliente[] ) => actions.obtenerClientesSuccess( { clientes: clientes } ) ),
                    catchError( ( error ) => of( actions.obtenerClientesError( { payload: { ... error } } ) ) )
                )
             )
        )
   );
}

