import { Action, createReducer, on } from '@ngrx/store';
import { Auth } from 'src/app/interfaces/auth.interface';
import * as actions from '../actions/auth.action';
import { AppState } from '../../../store/app.reducer';

export interface AuthState {
    auth: Auth |  null;
    loading: boolean;
    loaded: boolean;
    error: any; 
}

export interface AppStateAuth extends AppState{
    auth: AuthState
}

export const initialState: AuthState = {
   auth: null,
   loading: false,
   loaded: false,
   error: ''
}

const _authReducer = createReducer(initialState,

    on(actions.identificarUsuario, (state ,{ email, password } ) => (
        { 
            ...state, 
            loading: true,
            loaded : false,
            error   : ''
        }
    )),

    on(actions.identificarUsuarioSuccess, (state ,{ auth } ) => (
        { 
            ...state,
            auth   : auth, 
            loading: false,
            loaded : true,
            error  :''
        }
    )),

    on(actions.identificarUsuarioError, (state ,{ payload } ) => (
        { 
            ...state,
            auth   : null, 
            loading: false,
            loaded : false,
            error  : payload.error
        }
    )),

);

export function authReducer(state:any, action: Action) {
    return _authReducer(state, action);
}