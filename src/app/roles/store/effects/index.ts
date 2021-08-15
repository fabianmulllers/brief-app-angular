import { obtenerRolesEffect } from './obtenerRoles.effect'
import { obtenerRoleEditarEffect } from './obtenerRoleEditar.effect'
import { agregarRoleEffect } from './agregarRole.effect';
import { editarRoleEffect } from './editarRole.effect';

export const RolesEffectsArray: any[] = [
    obtenerRolesEffect,
    obtenerRoleEditarEffect,
    agregarRoleEffect,
    editarRoleEffect
]