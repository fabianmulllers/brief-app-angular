import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../../interfaces/auth.interface';

export const show = createAction(
    '[Modal Agregar Editar] show',
    props< { mostrar: boolean } >()
);


export const showEditar = createAction(
    '[Modal Agregar Editar] show Editar',
    props< { mostrar: boolean, id: number } >()
);

export const showEditarSuccess = createAction(
    '[Modal Agregar Editar] show Editar Success',
    props< { usuario:Usuario } >()
);

export const showEditarError = createAction(
    '[Modal Agregar Editar] show Editar Error',
    props< { payload: any } >()
);



