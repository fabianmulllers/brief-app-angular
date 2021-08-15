import { createAction, props } from '@ngrx/store';
import { Cliente } from '../../../interfaces/clientes.interface';

export const modalAgregar = createAction('[modalAgregarEditar] modal Agregar')


export const modalEditar = createAction(
    '[modalAgregarEditar] modal editar',
    props< { id: number} >()
)

export const modalEditarSuccess = createAction(
    '[modalAgregarEditar] modal editar Success',
    props< { cliente: Cliente} >()
)

export const modalEditarError = createAction(
    '[modalAgregarEditar] modal editar Error',
    props< { payload: any } >()
)