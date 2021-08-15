import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export interface EliminarElementoState {
    show:boolean;
    elemento: string;
    id: string | Number;
    texto: string;
    loading: boolean;
    loaded: boolean;
    error:any; 
}

export const eliminarElementoState: EliminarElementoState = {
   show: false,
   elemento: '',
   id: '',
   texto:'',
   loading: false,
   loaded: false,
   error: null
}

const _eliminarElementoReducer = createReducer( eliminarElementoState ,

    on( actions.openModalEliminar, (state , { show, elemento, id, texto } ) => ({ 
        ...state,
        show,
        elemento,
        texto,
        id,
        loaded: false,
        error:null
    })),

    on( actions.eliminarElemento, (state , { id, elemento } ) => ({ 
        ...state,
        show:false,
        loading: true,
        loaded: false,
        error:null
    })),

    on( actions.eliminarElementoSuccess, (state , exito ) => ({ 
        ...state,
        show:false,
        loading: false,
        loaded: true,
        error:null
    })),

    on( actions.eliminarElementoError, (state , {payload} ) => ({ 
        ...state,
        show:false,
        loading: false,
        loaded: false,
        error:payload.error
    })),

);

export function eliminarElementoReducer( state: any, action: Action ) {
    return _eliminarElementoReducer(state, action);
}