import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as actions from '../../../store/actions'
import * as actionsUsuarios from 'src/app/usuarios/store/actions'
import { Usuarios } from 'src/app/interfaces/usuario.interface';
import { tipoAlerta } from 'src/app/store/reducers/alerta.reducer';
import { TitleCasePipe } from '@angular/common'
import { ErroresPipe } from '../../../pipes/errores.pipe';
import Swal from 'sweetalert2'
import { UsuariosModuleState } from '../../store/usuarios.reducer';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styles: [
  ],
  providers:[ TitleCasePipe,ErroresPipe ]
})
export class TablaComponent implements OnInit {
  
  usuarios: Usuarios[] = [];
  loading: boolean = false;
  loaded: boolean = false;

  constructor(
    private store: Store<AppState>,
    private storeUsuarios: Store<UsuariosModuleState>,
    private TitleCase: TitleCasePipe,
    private ErrorPipe: ErroresPipe
  ) { }

  ngOnInit(): void {

    this.storeUsuarios.select('usuarios').subscribe(
      ( { loaded, loading, error, usuarios } ) => {
        
        this.loading = loading;

        if( loaded ){
          this.usuarios = usuarios!;
        }
        
        if( error ){
          const alerta = {
            mensaje: error.msg,
            tipo: tipoAlerta.alert,
            estado: true
          }
          this.store.dispatch( actions.mostrarAlerta({ alerta }))
        }

      }
    )

    this.store.select( 'eliminarElemento' ).subscribe(
      ( { elemento, loaded, error }) => {

        if( elemento === 'usuario' && loaded ){
          this.store.dispatch( actionsUsuarios.obtenerUsuarios() );
          Swal.fire({
            title: 'Exito!',
            text: `El usuario se elimino correctamente`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
        }

        if(error){
          Swal.fire({
            title: 'Error!',
            text: `${ this.ErrorPipe.transform(error) }`,
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        }
        
      }
    )

    this.store.dispatch( actionsUsuarios.obtenerUsuarios() );
  }

  eliminar( id : number, nombre: string){  

    this.store.dispatch( actions.openModalEliminar({ 
      show: true,
      elemento:'usuario',
      id, 
      texto:`Estas seguro de eliminar al usuario: ${ this.TitleCase.transform(nombre) }`
    }) );
    
  }

  mostrarUsuario( id: number ){
    this.store.dispatch( actionsUsuarios.mostrarUsuario( { id } ) );    
  }
  
  editarUsuario( id: number ){
    this.store.dispatch( actionsUsuarios.showEditar( { mostrar: true, id } ) );
  }

}
