import { createAction, props } from '@ngrx/store';
import { empresa } from 'src/app/interfaces/empresa.interface';

export const obtenerEmpresas = createAction('[obtener empresas] obtener Empresas');

export const obtenerEmpresasSuccess = createAction(
    '[obtener empresas] obtener Empresas Success',
    props<{ empresas: empresa[] }>()    
);

export const obtenerEmpresasError = createAction(
    '[obtener empresas] obtener Empresas Error',
    props<{ payload: any}>()
);