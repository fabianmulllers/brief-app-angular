import { createAction, props } from '@ngrx/store';
import { empresa } from 'src/app/interfaces/empresa.interface';


export const modalEditar = createAction(
    '[Empresa] modal Editar',
    props<{ id : number}>()
);


export const modalEditarSuccess = createAction(
    '[Empresa] modal Editar Success',
    props<{ empresa : empresa}>()
);


export const modalEditarError = createAction(
    '[Empresa] modal Editar Error',
    props<{ payload : any }>()
);