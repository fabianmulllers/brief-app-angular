import { createAction, props } from '@ngrx/store';
import { Cliente } from '../../../interfaces/clientes.interface';

export const agregarCliente = createAction(
    '[AgregarCliente] agregar Cliente',
    props<{ nombre: string, empresa: number}>() 
);

export const agregarClienteSuccess = createAction(
    '[AgregarCliente] agregar Cliente Success',
    props<{ cliente: Cliente}>() 
);


export const agregarClienteError = createAction(
    '[AgregarCliente] agregar Cliente Error',
    props<{ payload: any }>() 
);


export const editarCliente = createAction(
    '[EditarCliente] editar Cliente',
    props<{ id: number, nombre: string, empresa: number }>() 
);

export const editarClienteSuccess = createAction(
    '[EditarCliente] editar Cliente Success',
    props<{ cliente: Cliente}>() 
);

export const editarClienteError = createAction(
    '[EditarCliente] editar Cliente Error',
    props<{ payload: any }>() 
);