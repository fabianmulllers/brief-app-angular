import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';


import { AppState } from '../../../store/app.reducer';
import * as actions from '../../../store/actions'
import * as actionsClientes from '../../store/actions'
import { ClienteAppState } from '../../store/cliente.reducer';
import { Cliente } from 'src/app/interfaces/clientes.interface';
import { ErroresPipe } from '../../../pipes/errores.pipe';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [
  ],
  providers: [ ErroresPipe ]
})
export class TablaComponent implements OnInit, OnDestroy {
  
  obtenerCliente!:  Subscription
  eliminarElemento!: Subscription
  loading: boolean = false
  clientes: Cliente[] = []

  constructor(
    private store : Store<AppState>,
    private storeCliente: Store<ClienteAppState>,
    private ErroresPipe: ErroresPipe
  ) { }

  ngOnDestroy(): void {
    
    this.obtenerCliente.unsubscribe();
    this.eliminarElemento.unsubscribe();

  }

  ngOnInit(): void {

    this.storeCliente.dispatch( actionsClientes.obtenerClientes() )
    
    this.obtenerCliente = this.storeCliente.select( 'obtenerClientes' ).subscribe(
      ( { loading, loaded, clientes, error } ) => {
        
        this.loading = loading
        
        if( loaded ){
          this.clientes = clientes!;
        }
      
        if( error ){
          Swal.fire({
            title: 'Error!',
            text: this.ErroresPipe.transform( error ),
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        }

      }
    )

    this.eliminarElemento = this.store.select('eliminarElemento').subscribe(
      ( { loading, loaded, error } ) => {
        
        if( loaded ){
          Swal.fire({
            title: 'Exito!',
            text: 'Se elimino con exito!',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
        }

        if( error ){
          Swal.fire({
            title: 'Error!',
            text: this.ErroresPipe.transform( error ),
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        }


      }
    )

  }

  eliminar( id: number){
    
    this.store.dispatch( actions.openModalEliminar( {

			show:true,
			elemento: 'cliente',
			id,
			texto: "Estas seguro de eliminar este cliente?"

		}));

  }

  editar( id: number) {
    
    this.storeCliente.dispatch( actionsClientes.modalEditar( { id } ) )  

  }

}
