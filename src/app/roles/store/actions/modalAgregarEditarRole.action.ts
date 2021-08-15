import { createAction, props } from '@ngrx/store';
import { Role } from '../../../interfaces/roles.interface';

export const modalAgregar = createAction('[modalAgregarEditarRole] modal Agregar')


export const modalEditar = createAction(
    '[modalAgregarEditarRole] modal editar',
    props< { id: number} >()
)

export const modalEditarSuccess = createAction(
    '[modalAgregarEditarRole] modal editar Success',
    props< { role: Role} >()
)

export const modalEditarError = createAction(
    '[modalAgregarEditarRole] modal editar Error',
    props< { payload: any } >()
)