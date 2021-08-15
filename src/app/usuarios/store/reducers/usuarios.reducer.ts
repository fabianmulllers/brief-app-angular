import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';
import { Usuarios } from '../../../interfaces/usuario.interface';

export interface UsuariosState {
    usuarios: Usuarios[] | null,
    loading: boolean,
    loaded:boolean,
    error:any
}


export const usuariosState: UsuariosState = {
    
    usuarios:null,
    loading: false,
    loaded: false,
    error: null
}

const _usuariosReducer = createReducer(usuariosState,

    on(actions.obtenerUsuarios, state => ({ 
        ...state, 
        loading: true,
        loaded: false,
        error: null
    })),

    on(actions.obtenerUsuariosSuccess, (state, { usuarios }) => ({ 
        ...state, 
        usuarios: usuarios,
        loading: false,
        loaded: true,
        error: null
    })),

    on(actions.obtenerUsuariosError, (state, { payload }) => ({ 
        ...state, 
        usuarios: null,
        loading: false,
        loaded: false,
        error: payload
    })),

);

export function usuariosReducer(state: any, action: Action) {
    return _usuariosReducer(state, action);
}