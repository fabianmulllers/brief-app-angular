import { createAction, props } from '@ngrx/store';
import { Role } from '../../../interfaces/roles.interface';

export const obtenerRoles = createAction('[ObtenerRoles] obtener Roles');

export const obtenerRolesSuccess = createAction(
    '[ObtenerRoles] obtener Roles Success',
    props<{ roles: Role[]  }>()
);


export const obtenerRolesError = createAction(
    '[ObtenerRoles] obtener Roles Error',
    props<{ payload: any  }>()
);
