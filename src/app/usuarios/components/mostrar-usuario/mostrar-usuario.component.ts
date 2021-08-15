import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Usuario } from 'src/app/interfaces/auth.interface';
import { AppState } from '../../../store/app.reducer';
import * as actions from '../../../store/actions'
import { ErroresPipe } from '../../../pipes/errores.pipe';
import Swal from 'sweetalert2';
import { UsuariosModuleState } from '../../store/usuarios.reducer';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.component.html',
  styles: [
  ],
  providers:[ ErroresPipe ]
})
export class MostrarUsuarioComponent implements OnInit {

  loading: boolean = false;
  loaded: boolean = false;
  usuario!: Usuario;
  modal!: Modal;

  constructor(
    private store: Store<AppState>,
    private storeUsuarios: Store<UsuariosModuleState>,
    private ErroresPipe: ErroresPipe
  ) { }

  ngOnInit(): void {
      
    this.storeUsuarios.select('mostrarUsuario').subscribe(
      ( { loading, loaded, error, usuario }) => {
        
        this.loading = loading;
        
        if( loaded && usuario){
          this.loaded = loaded;
          this.usuario = usuario!;
          this.modal = new bootstrap.Modal( document.getElementById('mostrarUsuarioModal')! )
          this.modal.show();
        }

        if( error ){
          Swal.fire({
            title: 'Error!',
            text:  this.ErroresPipe.transform( error ),
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        }
      }
    )
  }

}
