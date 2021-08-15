import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/interfaces/auth.interface';
import * as actions from '../actions';

export interface ModalAgregarEditarState {
    loading: boolean;
    loaded: boolean;
    error: any;
    mostrar: boolean; 
    editar: boolean;
    usuario: Usuario | null;
}

export const modalAgregarEditar: ModalAgregarEditarState = {
    loading: false,
    loaded: false,
    error: null,
    mostrar: false,
    editar: false,
    usuario: null
}

const _modalAgregarEditarReducer = createReducer(modalAgregarEditar,

    on( actions.show , (state, { mostrar } ) => ({ 
        ...state, 
        usuario: null,
        loaded:true,
        mostrar: mostrar,
        editar: false
    } ) ),

    on( actions.showEditar , (state, { mostrar, id } ) => ({ 
        ...state,
        loading: true,
        loaded: false, 
        mostrar: false,
        editar: true
    } ) ),

    on( actions.showEditarSuccess , (state, { usuario } ) => ({ 
        ...state, 
        usuario: {...usuario},
        mostrar: true,
        loaded: true,
        loading: false,
        error: null

    } ) ),

    on( actions.showEditarError , (state, { payload } ) => ({ 
        ...state, 
        mostrar: false,
        usuario: null,
        loaded: false,
        loading: false,
        error: payload.error
    } ) ),

);

export function modalAgregarEditarReducer(state : any, action: Action) {
    return _modalAgregarEditarReducer(state, action);
}