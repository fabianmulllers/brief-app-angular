import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/interfaces/auth.interface';
import { AgregarUsuario } from 'src/app/interfaces/usuario.interface';

export const agregarUsuario = createAction(
    '[Agregar Usuario] agregarUsuario',
    props< { usuario: AgregarUsuario } >()
);

export const agregarUsuarioSuccess = createAction(
    '[Agregar Usuario Success] agregarUsuarioSuccess',
    props<{ usuario: Usuario }>()
);

export const agregarUsuarioError = createAction(
    '[Agregar Usuario Error] agregarUsuarioError',
    props<{ payload: any }>()
);


/**
 * EDITAR USUARIO
 */

export const editarUsuario = createAction(
    '[Editar Usuario] Editar Usuario',
    props< { usuario: AgregarUsuario } >()
);

export const editarUsuarioSuccess = createAction(
    '[Editar Usuario] Editar Usuario Success',
    props<{ usuario: Usuario }>()
);

export const editarUsuarioError = createAction(
    '[Editar Usuario Error] Editar Usuario Error',
    props<{ payload: any }>()
);