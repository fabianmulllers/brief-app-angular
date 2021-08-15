import { createAction, props } from '@ngrx/store';



export const openModalEliminar = createAction(
    '[Eliminar Elemento] abrir modal Eliminar',
    props<{show:boolean, elemento: string, id: string | Number, texto: string }>()
)

export const eliminarElemento = createAction(
    '[Eliminar Elemento] eliminar Elemento',
    props<{ id: string | Number, elemento:string, }>()
);

export const eliminarElementoSuccess = createAction(
    '[Eliminar Elemento] eliminar Elemento Success',
    props<{ exito: any }>()
);

export const eliminarElementoError = createAction(
    '[Eliminar Elemento] eliminar Elemento Error',
    props<{ payload: any }>()
);




