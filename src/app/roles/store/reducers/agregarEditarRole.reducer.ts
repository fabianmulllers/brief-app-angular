import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Role } from '../../../interfaces/roles.interface';

export interface agregarEditarRoleState {
    role: Role | null,
    loading: boolean,
    loaded: boolean,
    error: any,
    id:number | null
    editar: boolean
}

export const agregarEditarRoleState: agregarEditarRoleState = {
    role: null,
    loading: false,
    loaded: false,
    error: null,
    id: null,
    editar: false
}

const _agregarEditarRoleReducer = createReducer(agregarEditarRoleState,

    on( actions.agregarRole, state => ({ 
        ...state, 
        role: null,
        loading: true,
        loaded: false,
        error: null,
        id: null,
        editar: false
    })),

    on( actions.agregarRoleSuccess, (state , { role }) => ({ 
        ...state, 
        role: role,
        loading: false,
        loaded: true,
        error: null,
        id: null,
        editar: false
    })),

    on( actions.agregarRoleError, (state , { payload }) => ({ 
        ...state, 
        role: null,
        loading: false,
        loaded: false,
        error: payload.error,
        id: null,
        editar: false
    })),

    on( actions.editarRole, (state, { id }) => ({ 
        ...state, 
        role: null,
        loading: true,
        loaded: false,
        error: null,
        id: id,
        editar: true
    })),

    on( actions.editarRoleSuccess, (state , { role }) => ({ 
        ...state, 
        role: role,
        loading: false,
        loaded: true,
        error: null,
        editar: true
    })),

    on( actions.editarRoleError, (state , { payload }) => ({ 
        ...state, 
        role: null,
        loading: false,
        loaded: false,
        error: payload.error,
        editar: true
    })),

);

export function agregarEditarRoleReducer(state: any, action: Action) {
    return _agregarEditarRoleReducer(state, action);
}