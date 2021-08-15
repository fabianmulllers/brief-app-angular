import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions';

export enum tipoAlerta {
    'primary',
    'success',
    'warning',
    'alert'
}

export interface AlertaState {
    mensaje: string;
    tipo   : tipoAlerta;
    estado :boolean;
}

export const AlertaState: AlertaState = {
   mensaje:"",
   tipo: tipoAlerta.primary,
   estado:false
}

const _aleratReducer = createReducer(AlertaState,

    on(actions.mostrarAlerta, (state, {alerta} )=> ({ 
        ...state,
        mensaje: alerta.mensaje,
        tipo: alerta.tipo,
        estado: alerta.estado
    })),

);

export function alertaReducer(state:any, action:Action) {
    return _aleratReducer(state, action);
}