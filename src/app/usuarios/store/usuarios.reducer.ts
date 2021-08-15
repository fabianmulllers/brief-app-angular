
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'

import * as reducers from './reducers'



export interface UsuariosModuleState{
    usuarios: reducers.UsuariosState,
    usuario: reducers.UsuarioState,
    modalAgregarEditar: reducers.ModalAgregarEditarState,
    mostrarUsuario: reducers.mostrarUsuarioState
}



export const usuariosModuleReducers: ActionReducerMap<UsuariosModuleState> = {
    usuarios: reducers.usuariosReducer,
    modalAgregarEditar: reducers.modalAgregarEditarReducer,
    usuario: reducers.usuarioReducer,
    mostrarUsuario: reducers.mostrarUsuarioReducer
}



