import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Cliente } from '../../../interfaces/clientes.interface';

export interface obtenerClienteState {
    clientes: Cliente[] | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const obtenerClienteState: obtenerClienteState = {
   clientes: null,
   loading: false,
   loaded: false,
   error: null
}

const _obtenerClienteReducer = createReducer( obtenerClienteState,

    on(actions.obtenerClientes, state => (
        { 
            ...state,
            loading: true,
            loaded: false,
            error: null

        }
    )),

    on(actions.obtenerClientesSuccess, (state , {clientes}) => (
        { 
            ...state,
            clientes: clientes,
            loading: false,
            loaded: true,
            error: null

        }

    )),

    on(actions.obtenerClientesError, (state , {payload}) => (
        { 
            ...state,
            clientes: null,
            loading: false,
            loaded: false,
            error: payload.error

        }

    )),

);

export function obtenerClienteReducer(state : any , action: Action) {
    return _obtenerClienteReducer(state, action);
}