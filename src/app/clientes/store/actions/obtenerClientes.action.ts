import { createAction, props } from '@ngrx/store';
import { Cliente } from '../../../interfaces/clientes.interface';

export const obtenerClientes = createAction('[ObtenerClientes] obtener Clientes');

export const obtenerClientesSuccess = createAction(
    '[ObtenerClientes] obtener Clientes Success',
    props<{ clientes: Cliente[]  }>()
);


export const obtenerClientesError = createAction(
    '[ObtenerClientes] obtener Clientes Error',
    props<{ payload: any  }>()
);
