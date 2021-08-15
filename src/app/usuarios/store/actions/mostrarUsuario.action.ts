import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../../interfaces/auth.interface';

export const mostrarUsuario = createAction(
    '[Mostrar Usuario] Mostrar usuario',
    props<{ id : number}> () 
);

export const mostrarUsuarioSuccess = createAction(
    '[Mostrar Usuario] Mostrar usuario Success',
    props<{ usuario : Usuario}> () 
);

export const mostrarUsuarioError = createAction(
    '[Mostrar Usuario] Mostrar usuario Error',
    props<{ payload : any}> () 
);