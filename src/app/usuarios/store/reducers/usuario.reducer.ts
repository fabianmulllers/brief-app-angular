import { Action, createReducer, on } from '@ngrx/store';
import * as actions from 'src/app/usuarios/store/actions';
import { Usuario } from '../../../interfaces/auth.interface';
import { agregarUsuarioError } from '../actions/usuario.action';

export interface UsuarioState {
    usuario: Usuario | null;
    loading: boolean;
    loaded: boolean;
    error: any
}

export const usuarioState: UsuarioState = {
   usuario: null,
   loading: false,
   loaded: false,
   error: null
}

const _usuarioReducer = createReducer(usuarioState,

    on(actions.agregarUsuario, state => ({ 
        ...state, 
        loading: true,
        loaded: false,
        error:null
    })),

    on(actions.agregarUsuarioSuccess, (state, {usuario}) => ({ 
        ...state, 
        usuario: {...usuario},
        loading: false,
        loaded: true,
        error:null
    })),

    on(actions.agregarUsuarioError, (state, {payload}) => ({ 
        ...state, 
        usuario: null,
        loading: false,
        loaded: false,
        error: payload.error
    })),


    on(actions.editarUsuario, state => ({ 
        ...state, 
        loading: true,
        loaded: false,
        error:null
    })),


    on(actions.editarUsuarioSuccess, (state, {usuario}) => ({ 
        ...state, 
        usuario: {...usuario},
        loading: false,
        loaded: true,
        error:null
    })),


    on(actions.editarUsuarioError, (state, {payload}) => ({ 
        ...state, 
        usuario: null,
        loading: false,
        loaded: false,
        error: payload.error
    })),

);

export function usuarioReducer( state:any, action:Action ) {
    return _usuarioReducer( state, action );
}