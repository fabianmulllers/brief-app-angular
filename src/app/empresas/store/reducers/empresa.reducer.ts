import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { empresa } from '../../../interfaces/empresa.interface';

export interface empresaState {
    empresa: empresa | null,
    show: boolean,
    loading: boolean,
    loaded: boolean,
    error: any,
    editar: boolean,
    id: number | null
}

export const empresaState: empresaState = {
    empresa: null,
    show: false,
    loading: false,
    loaded: false,
    error: null,
    editar: false,
    id: null
}

const _empresaReducer = createReducer(empresaState,
        
    // agregar
    on( actions.modalAgregar, state => ({ 
        ...state,
        empresa: null,
        loading: false,
        loaded: false,
        error: null,
        show: true,
        editar: false,
        id: null
    })),

    on( actions.agregarEmpresa , state  => ({ 
        ...state,
        empresa: null,
        loading: true,
        loaded: false,
        error: null,
        show: false,
        editar: false,

    })),

    on( actions.agregarEmpresaSuccess , (state , { empresa }) => ({ 
        ...state,
        empresa: empresa,
        loading: false,
        loaded: true,
        error: null,
        show: false,
        editar: false,

    })),

    on( actions.agregarEmpresaError , ( state, { payload } ) => ({ 
        ...state,
        empresa: null,
        loading: false,
        loaded: false,
        error: payload.error,
        show: false,
        editar: false,

    })),

    // editar

    on( actions.modalEditar, state => ({ 
        ...state,
        empresa: null,
        loading: false,
        loaded: false,
        error: null,
        show: true,
        editar: true,

    })),

    on( actions.editarEmpresa , (state, { id })  => ({ 
        ...state,
        empresa: null,
        loading: true,
        loaded: false,
        error: null,
        show: false,
        editar: true,
        id: id
    })),

    on( actions.editarEmpresaSuccess , (state , { empresa }) => ({ 
        ...state,
        empresa: empresa,
        loading: false,
        loaded: true,
        error: null,
        show: false,
        editar: false,

    })),

    on( actions.editarEmpresaError , ( state, { payload } ) => ({ 
        ...state,
        empresa: null,
        loading: false,
        loaded: false,
        error: payload.error,
        show: false,
        editar: true,

    })),

);

export function empresaReducer( state: any , action: Action ) {
    return _empresaReducer(state, action);
}