
import { UsuariosEffect } from './usuarios.effect';
import { UsuarioEffect } from './usuario.effect'
import { MostrarUsuarioEffect } from './mostrarUsuario.effect'
import { ObtenerUsuarioEditarEffect } from './obtenerUsuarioEditar.effect';
import { EditarUsuarioEffect } from './editarUsuario.effect';

export const UsuariosModuleEffectsArray: any[] = [ 
    UsuariosEffect,
    UsuarioEffect, 
    MostrarUsuarioEffect,
    ObtenerUsuarioEditarEffect,
    EditarUsuarioEffect    
]