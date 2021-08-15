import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { RoleAppState } from '../../store/role.reducers';

import * as actionsRole from '../../store/actions'
import * as actions from '../../../store/actions'
import { ErroresPipe } from '../../../pipes/errores.pipe';
import { Subscription } from 'rxjs/internal/Subscription';
import { Modal } from 'bootstrap';
import { Role } from 'src/app/interfaces/roles.interface';
import { AlertaState, tipoAlerta } from 'src/app/store/reducers';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styles: [
  ],
  providers:[ ErroresPipe ]
})
export class AgregarEditarComponent implements OnInit, OnDestroy {
  

  modalAgregarEditar! : Subscription
  agregarRole!: Subscription
  modal!: Modal
  editar: boolean = false
  role!: Role
  loading: boolean = false
  loaded: boolean = false
  id!: number

  form: FormGroup = this.fb.group( {
    nombre:['',Validators.required],
  })

  constructor(
    private store: Store<AppState>,
    private storeRole: Store<RoleAppState>,
    private fb: FormBuilder,
    private ErroresPipe: ErroresPipe
  ) { }

  ngOnDestroy(): void {
    this.modalAgregarEditar.unsubscribe();
  }

  ngOnInit(): void {

    // estado del modal
    this.modalAgregarEditar =  this.storeRole.select('modalAgregarEditarRole').subscribe(
      ( { loading, loaded, show, editar, role }) => {
        
        this.loading = loading
          
        if( show ){
          this.openModal()
          this.editar = editar      
        }

        if( loaded ){
          this.role = role!
          this.llenarCampos()
        }
      }
    )

    //estado que agregar o editar
    this.agregarRole = this.storeRole.select('agregarEditarRole').subscribe(
      ( { loading, loaded, role, error, editar } ) => {
        
          
        if( loaded ){
          Swal.fire({
            title: 'Exito!',
            text: `El Role ${role?.nombre} se ${ (editar)? 'edito':'creo' } correctamente`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
  
          if(!editar){ this.form.reset(); }
          this.store.dispatch( actionsRole.obtenerRoles() )
        }

        if(error){
          const alerta: AlertaState = {
            mensaje: this.ErroresPipe.transform( error ),
            tipo: tipoAlerta.alert,
            estado: true
          }
  
          this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
        }

      }
    )

  }

  openModal() {
    this.form.reset()
    const alerta: AlertaState = {
      mensaje: '',
      tipo: tipoAlerta.alert,
      estado: false
    }

    this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
    this.modal = new bootstrap.Modal( document.getElementById('agregarEditarRole')! )
    this.modal.show()
  }

  llenarCampos() {
    console.log( this.role.nombre )
    this.form.get('nombre')?.setValue( this.role.nombre )
  }

  camposEsValido( campo: string){

    return this.form.get( campo )?.invalid &&
    this.form.get( campo )?.touched

  }

  enviar(){
    
    this.form.markAllAsTouched()
    if( this.form.invalid) return;
    
    const { nombre, empresa } = this.form.value
    if( !this.editar){

      this.storeRole.dispatch( actionsRole.agregarRole( { nombre } ) )

    }else{
      this.storeRole.dispatch( actionsRole.editarRole( { id: this.role.id!, nombre } ) )
    }

  }

}
