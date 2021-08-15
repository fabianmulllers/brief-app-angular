import { createAction, props } from '@ngrx/store';
import { Role } from 'src/app/interfaces/roles.interface';

export const agregarRole = createAction(
    '[AgregarRole] agregar Role',
    props<{ nombre: string }>() 
);

export const agregarRoleSuccess = createAction(
    '[AgregarRole] agregar Role Success',
    props<{ role: Role}>() 
);


export const agregarRoleError = createAction(
    '[AgregarRole] agregar Role Error',
    props<{ payload: any }>() 
);


export const editarRole = createAction(
    '[EditarRole] editar Role',
    props<{ id: number, nombre: string }>() 
);

export const editarRoleSuccess = createAction(
    '[EditarRole] editar Role Success',
    props<{ role: Role}>() 
);

export const editarRoleError = createAction(
    '[EditarRole] editar Role Error',
    props<{ payload: any }>() 
);