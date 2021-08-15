import { ObtenerEmpresasEffect } from './obtenerEmpresas.effect';
import { agregarEmpresaEffect } from './agregarEmpresa.effect';
import { modalEditarEffect } from './modalEditar.effect';
import { editarEmpresaEffect } from './editarEmpresa.effect';



export const EmpresasModuleEffectArray: any[] = [
    ObtenerEmpresasEffect,
    agregarEmpresaEffect,
    modalEditarEffect,
    editarEmpresaEffect
]