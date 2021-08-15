
import { ActionReducerMap } from '@ngrx/store'

import * as reducers from './reducers'


export interface AppState{
    alert: reducers.AlertaState,
    // usuarios: reducers.UsuariosState,
    // usuario: reducers.UsuarioState,
    // modalAgregarEditar: reducers.ModalAgregarEditarState,
    eliminarElemento: reducers.EliminarElementoState,
    // mostrarUsuario: reducers.mostrarUsuarioState
}

export const appReducers: ActionReducerMap<AppState> = {
    alert: reducers.alertaReducer,
    // usuarios: reducers.usuariosReducer,
    // modalAgregarEditar: reducers.modalAgregarEditarReducer,
    // usuario: reducers.usuarioReducer,
    eliminarElemento: reducers.eliminarElementoReducer,
    // mostrarUsuario: reducers.mostrarUsuarioReducer
}