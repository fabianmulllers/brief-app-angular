import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Cliente } from '../../../interfaces/clientes.interface';

export interface agregarEditarClienteState {
    cliente: Cliente | null,
    loading: boolean,
    loaded: boolean,
    error: any,
    id:number | null
    editar: boolean
}

export const agregarEditarClienteState: agregarEditarClienteState = {
    cliente: null,
    loading: false,
    loaded: false,
    error: null,
    id: null,
    editar: false
}

const _agregarEditarClienteReducer = createReducer(agregarEditarClienteState,

    on( actions.agregarCliente, state => ({ 
        ...state, 
        cliente: null,
        loading: true,
        loaded: false,
        error: null,
        id: null,
        editar: false
    })),

    on( actions.agregarClienteSuccess, (state , { cliente }) => ({ 
        ...state, 
        cliente: cliente,
        loading: false,
        loaded: true,
        error: null,
        id: null,
        editar: false
    })),

    on( actions.agregarClienteError, (state , { payload }) => ({ 
        ...state, 
        cliente: null,
        loading: false,
        loaded: false,
        error: payload.error,
        id: null,
        editar: false
    })),

    on( actions.editarCliente, (state, { id }) => ({ 
        ...state, 
        cliente: null,
        loading: true,
        loaded: false,
        error: null,
        id: id,
        editar: true
    })),

    on( actions.editarClienteSuccess, (state , { cliente }) => ({ 
        ...state, 
        cliente: cliente,
        loading: false,
        loaded: true,
        error: null,
        editar: true
    })),

    on( actions.editarClienteError, (state , { payload }) => ({ 
        ...state, 
        cliente: null,
        loading: false,
        loaded: false,
        error: payload.error,
        editar: true
    })),

);

export function agregarEditarClienteReducer(state: any, action: Action) {
    return _agregarEditarClienteReducer(state, action);
}