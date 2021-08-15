import * as reducers from './reducers'


export interface ClienteAppState {
    obtenerClientes: reducers.obtenerClienteState,
    modalAgregarEditar: reducers.modalAgregarEditarState
    agregarEditarCliente: reducers.agregarEditarClienteState
}