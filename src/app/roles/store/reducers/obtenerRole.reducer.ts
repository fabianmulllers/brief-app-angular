import { Action, createReducer, on } from '@ngrx/store';
import { Role } from 'src/app/interfaces/roles.interface';
import * as actions from '../actions';

export interface obtenerRoleState {
    roles: Role[] | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const obtenerRoleState: obtenerRoleState = {
   roles: null,
   loading: false,
   loaded: false,
   error: null
}

const _obtenerRoleReducer = createReducer( obtenerRoleState,

    on(actions.obtenerRoles, state => (
        { 
            ...state,
            loading: true,
            loaded: false,
            error: null

        }
    )),

    on(actions.obtenerRolesSuccess, (state , { roles }) => (
        { 
            ...state,
            roles: roles,
            loading: false,
            loaded: true,
            error: null

        }

    )),

    on(actions.obtenerRolesError, (state , {payload}) => (
        { 
            ...state,
            roles: null,
            loading: false,
            loaded: false,
            error: payload.error

        }

    )),

);

export function obtenerRoleReducer(state : any , action: Action) {
    return _obtenerRoleReducer(state, action);
}