import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { Role } from 'src/app/interfaces/roles.interface';
import { AppState } from 'src/app/store/app.reducer';

import { ErroresPipe } from '../../../pipes/errores.pipe';
import { RoleAppState } from '../../store/role.reducers';

import * as actions from '../../../store/actions'
import * as actionsRoles from '../../store/actions'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [
  ],
  providers: [ ErroresPipe ]
})
export class TablaComponent implements OnInit, OnDestroy {

  obtenerRole!:  Subscription
  eliminarElemento!: Subscription
  loading: boolean = false
  roles: Role[] = []

  constructor(
    private store : Store<AppState>,
    private storeRole: Store<RoleAppState>,
    private ErroresPipe: ErroresPipe
  ) { }

  ngOnDestroy(): void {
    
    this.obtenerRole.unsubscribe();
    this.eliminarElemento.unsubscribe();

  }

  ngOnInit(): void {

    this.storeRole.dispatch( actionsRoles.obtenerRoles() )
    
    this.obtenerRole = this.storeRole.select( 'obtenerRoles' ).subscribe(
      ( { loading, loaded, roles, error } ) => {
                
        if( loaded ){
          this.roles = roles!;
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
			elemento: 'role',
			id,
			texto: "Estas seguro de eliminar este role?"

		}));

  }

  editar( id: number) {
    console.log( id )
    this.storeRole.dispatch( actionsRoles.modalEditar( { id } ) )  

  }

}
