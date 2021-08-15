import * as reducers from './reducers'


export interface RoleAppState {
    obtenerRoles: reducers.obtenerRoleState,
    modalAgregarEditarRole: reducers.modalAgregarEditarRoleState
    agregarEditarRole: reducers.agregarEditarRoleState
}