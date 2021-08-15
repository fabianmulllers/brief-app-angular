import { createAction, props } from '@ngrx/store';
import { Auth } from '../../../interfaces/auth.interface';

export const identificarUsuario = createAction(
    '[Identificar Usuario] identificarUsuario',
    props<{ email:string, password: string}>() 
);

export const identificarUsuarioSuccess = createAction(
    '[Identificar Usuario Success] identificarUsuarioSuccess',
    props<{ auth: Auth}>()
)


export const identificarUsuarioError = createAction(
    '[Identificar Usuario Error] identificarUsuarioError',
    props<{ payload: any}>()
)



