import { Action, createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/interfaces/auth.interface';
import * as actions from '../actions';

export interface mostrarUsuarioState {
    usuario: Usuario | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const mostrarUsuarioState: mostrarUsuarioState = {
   usuario: null,
   loading: false,
   loaded: false,
   error: null
}

const _mostrarUsuarioReducer = createReducer(mostrarUsuarioState,

    on( actions.mostrarUsuario, state => ({ 
        ...state,
        loaded: false,
        loading: true,
        error:null
    })),

    on( actions.mostrarUsuarioSuccess, (state , { usuario }) => ({ 
        ...state,
        usuario: usuario,
        loaded: true,
        loading: false,
        error:null
    })),


    on( actions.mostrarUsuarioError, (state, { payload }) => ({ 
        ...state,
        loaded: false,
        loading: false,
        error:payload.error
    })),

);

export function mostrarUsuarioReducer(state: any, action: Action) {
    return _mostrarUsuarioReducer(state, action);
}