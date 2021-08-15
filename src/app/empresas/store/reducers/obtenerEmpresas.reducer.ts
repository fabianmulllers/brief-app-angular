import { Action, createReducer, on } from '@ngrx/store';
import { empresa } from 'src/app/interfaces/empresa.interface';
import * as actions from '../actions';

export interface obtenerEmpresasState {
    empresas: empresa[] | null;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const obtenerEmpresasState: obtenerEmpresasState = {
   empresas: null,
   loading: false,
   loaded: false,
   error: null
}

const _obtenerEmpresasReducer = createReducer( obtenerEmpresasState,

    on( actions.obtenerEmpresas, state => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),

    on( actions.obtenerEmpresasSuccess, ( state ,{ empresas }) => ({
        ...state,
        empresas: empresas,
        loading: false,
        loaded : true,
        error  : null
    })),

    on( actions.obtenerEmpresasError, ( state ,{ payload }) => ({
        ...state,
        empresas: null,
        loading : false,
        loaded  : false,
        error   : payload.error
    })),

);

export function obtenerEmpresasReducer( state: any, action: Action ) {
    return _obtenerEmpresasReducer(state, action);
}