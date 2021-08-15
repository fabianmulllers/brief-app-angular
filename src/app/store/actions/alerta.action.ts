import { createAction, props } from '@ngrx/store';
import { AlertaState } from '../reducers/alerta.reducer';

export const mostrarAlerta = createAction(
    '[Mostrar Alerta] show',
    props<{alerta: AlertaState}>()
);
