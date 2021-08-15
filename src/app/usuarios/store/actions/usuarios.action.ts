import { createAction, props } from '@ngrx/store';
import { Usuarios } from 'src/app/interfaces/usuario.interface';

export const obtenerUsuarios = createAction('[obtener Usuarios] obtenerUsuarios');


export const obtenerUsuariosSuccess = createAction(
    '[obtener Usuarios Success] obtenerUsuarios',
    props< {usuarios: Usuarios[] } >()
)

export const obtenerUsuariosError = createAction(
    '[obtener Usuarios Error] obtenerUsuarios',
    props<{ payload: any }>()
)