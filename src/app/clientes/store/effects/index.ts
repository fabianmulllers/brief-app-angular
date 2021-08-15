import { obtenerClientesEffect } from './obtenerClientes.effect'
import { obtenerClienteEditarEffect } from './obtenerClienteEditar.effect'
import { agregarClienteEffect } from './agregarCliente.effect';
import { editarClienteEffect } from './editarCliente.effect';

export const clientesEffectsArray: any[] = [
    obtenerClientesEffect,
    obtenerClienteEditarEffect,
    agregarClienteEffect,
    editarClienteEffect
]