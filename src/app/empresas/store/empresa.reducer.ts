
import { ActionReducerMap } from '@ngrx/store'

import * as reducers from './reducers'



export interface EmpresasModuleState{
    obtenerEmpresas: reducers.obtenerEmpresasState,
    empresa: reducers.empresaState,
    modalEditar: reducers.modalEditarState
}



