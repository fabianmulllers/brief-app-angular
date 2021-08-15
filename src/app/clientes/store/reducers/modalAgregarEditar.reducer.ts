import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Cliente } from '../../../interfaces/clientes.interface';
import { modalAgregarEditar } from '../../../usuarios/store/reducers/modalAgregarEditar.reducer';

export interface modalAgregarEditarState {
    cliente: Cliente | null;
    loading: boolean;
    loaded: boolean;
    error: any;
    id: number | null; 
    show: boolean;
    editar: boolean;
}

export const modalAgregarEditarState: modalAgregarEditarState = {
    cliente: null,
    loading: false,
    loaded: false,
    error: null,
    id: null,
    show: false,
    editar: false
}

const _modalAgregarEditarRecucer = createReducer( modalAgregarEditarState,

    on( actions.modalAgregar , state => ({ 
        ...state, 
        cliente: null,
        loading: false,
        loaded: false,
        error: null,
        id: null,
        show: true,
        editar: false
    })),


    on( actions.modalEditar , (state , {  id } ) => ({ 
        ...state, 
        cliente: null,
        loading: true,
        loaded: false,
        error: null,
        id: id,
        show: false,
        editar: true
    })),

    on( actions.modalEditarSuccess , (state , {  cliente } ) => ({ 
        ...state, 
        cliente: cliente,
        loading: false,
        loaded: true,
        error: null,
        show: true,
        editar: true
    })),

    on( actions.modalEditarError , (state , {  payload } ) => ({ 
        ...state, 
        cliente: null,
        loading: false,
        loaded: false,
        error: null,
        show: false,
        editar: true
    })),

);

export function modalAgregarEditarClienteRecucer(state : any, action: Action ) {
    return _modalAgregarEditarRecucer(state, action);
}