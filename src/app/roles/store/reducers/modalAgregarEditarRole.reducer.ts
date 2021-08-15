import { Action, createReducer, on } from '@ngrx/store';
import { Role } from 'src/app/interfaces/roles.interface';
import * as actions from '../actions';

export interface modalAgregarEditarRoleState {
    role: Role | null;
    loading: boolean;
    loaded: boolean;
    error: any;
    id: number | null; 
    show: boolean;
    editar: boolean;
}

export const modalAgregarEditarRoleState: modalAgregarEditarRoleState = {
    role: null,
    loading: false,
    loaded: false,
    error: null,
    id: null,
    show: false,
    editar: false
}

const _modalAgregarEditarRecucer = createReducer( modalAgregarEditarRoleState,

    on( actions.modalAgregar , state => ({ 
        ...state, 
        role: null,
        loading: false,
        loaded: false,
        error: null,
        id: null,
        show: true,
        editar: false
    })),


    on( actions.modalEditar , (state , {  id } ) => ({ 
        ...state, 
        role: null,
        loading: true,
        loaded: false,
        error: null,
        id: id,
        show: false,
        editar: true
    })),

    on( actions.modalEditarSuccess , (state , {  role } ) => ({ 
        ...state, 
        role: role,
        loading: false,
        loaded: true,
        error: null,
        show: true,
        editar: true
    })),

    on( actions.modalEditarError , (state , {  payload } ) => ({ 
        ...state, 
        role: null,
        loading: false,
        loaded: false,
        error: null,
        show: false,
        editar: true
    })),

);

export function modalAgregarEditarRoleRecucer(state : any, action: Action ) {
    return _modalAgregarEditarRecucer(state, action);
}