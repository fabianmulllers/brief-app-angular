import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

import { empresa } from 'src/app/interfaces/empresa.interface';
import { EmpresasModuleState } from '../../store/empresa.reducer';
import { ErroresPipe } from '../../../pipes/errores.pipe';
import * as actions from '../../../store/actions'
import * as actionsEmpresas from '../../store/actions'
import { obtenerEmpresas } from '../../store/actions/obtenerEmpresas.action';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap';
import { show } from '../../../usuarios/store/actions/modalAgregarEditar.action';

@Component({
	selector: 'app-tabla',
	templateUrl: './tabla.component.html',
	styles: [
	],
	providers: [ ErroresPipe]
})
export class TablaComponent implements OnInit, OnDestroy {
  
	empresas: empresa[] = [];
	obtenerEmpresas!: Subscription
	eliminarEmpresa! : Subscription


	constructor(
		private store: Store<AppState>,
		private storeEmpresas: Store<EmpresasModuleState>,
		private ErroresPipe: ErroresPipe
	) { }

	ngOnDestroy(): void {
		
		this.obtenerEmpresas.unsubscribe();
		this.eliminarEmpresa.unsubscribe();
	}

	ngOnInit(): void {
	
		this.obtenerEmpresas = this.storeEmpresas.select('obtenerEmpresas')
			.subscribe( ( { loading, loaded, error, empresas } ) => {
					
					if( loaded ){
						this.empresas = empresas!;[];
						console.log( empresas );
					}
					

					if( error ){
						Swal.fire({
							title: 'Error!',
							text: this.ErroresPipe.transform( error ),
							icon: 'error',
							confirmButtonText: 'Cerrar'
						})
					}
			} );
		
		this.store.dispatch( actionsEmpresas.obtenerEmpresas( ) );

		this.eliminarEmpresa = this.store.select('eliminarElemento')
		.subscribe( ( { loading, loaded, elemento } )  => {

			if( loaded && elemento === 'empresa'){
				Swal.fire({
					title: 'Exito!',
					text: `Se elimino correctamente`,
					icon: 'success',
					confirmButtonText: 'Cerrar'
				  })
				this.storeEmpresas.dispatch( actionsEmpresas.obtenerEmpresas() )
			}

		});

	}


	eliminar( id : number) {
		
		this.store.dispatch( actions.openModalEliminar( {

			show:true,
			elemento: 'empresa',
			id,
			texto: "Estas seguro de eliminar esta empresa?"

		}));

	}

	editar( id: number ){
		
		this.storeEmpresas.dispatch( actionsEmpresas.modalEditar( { id } ) )
	}

}
