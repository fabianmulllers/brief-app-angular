import { createAction, props } from '@ngrx/store';
import { empresa } from 'src/app/interfaces/empresa.interface';

//agregar 

export const modalAgregar = createAction(
    '[Empresa] modal Agregar'
);

export const agregarEmpresa = createAction(
    '[Empresa] agregar Empresa',
    props<{ nombre: string } >()
);

export const agregarEmpresaSuccess = createAction(
    '[Empresa] agregar Empresa Success',
    props<{ empresa: empresa } >()
);

export const agregarEmpresaError = createAction(
    '[Empresa] agregar Empresa Error',
    props<{ payload: any } >()
);

//editar

export const editarEmpresa = createAction(
    '[Empresa] editar Empresa',
    props<{ nombre: string, id: number } >()
);

export const editarEmpresaSuccess = createAction(
    '[Empresa] editar Empresa Success',
    props<{ empresa: empresa } >()
);

export const editarEmpresaError = createAction(
    '[Empresa] editar Empresa Error',
    props<{ payload: any } >()
);