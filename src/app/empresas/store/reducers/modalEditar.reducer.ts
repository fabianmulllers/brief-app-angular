import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { empresa } from '../../../interfaces/empresa.interface';

export interface modalEditarState {
    empresa: empresa | null,
    show: boolean,
    loading: boolean,
    loaded: boolean,
    error: any,
    id: number | null
}

export const modalEditarState: modalEditarState = {
    empresa: null,
    show: false,
    loading: false,
    loaded: false,
    error: null,
    id: null
}

const _modalEditarReducer = createReducer(modalEditarState,
    
    // editar

    on( actions.modalEditar, (state, { id }) => ({ 
        ...state,
        empresa: null,
        loading: false,
        loaded: false,
        error: null,
        show: true,
        id: id

    })),

    on( actions.modalEditarSuccess , (state , { empresa }) => ({ 
        ...state,
        empresa: empresa,
        loading: false,
        loaded: true,
        error: null,
        show: false,

    })),

    on( actions.editarEmpresaError , ( state, { payload } ) => ({ 
        ...state,
        empresa: null,
        loading: false,
        loaded: false,
        error: payload.error,
        show: false,

    })),

);

export function modalEditarReducer( state: any , action: Action ) {
    return _modalEditarReducer(state, action);
}