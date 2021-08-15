import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../auth/app.reducer';
import { ClienteAppState } from '../../store/cliente.reducer';
import { Cliente } from '../../../interfaces/clientes.interface';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as actionsCliente from '../../store/actions'
import * as actions from '../../../store/actions'
import { AlertaState, tipoAlerta } from 'src/app/store/reducers';
import { ErroresPipe } from '../../../pipes/errores.pipe';
import Swal from 'sweetalert2';
import { empresa } from '../../../interfaces/empresa.interface';
import { EmpresasService } from '../../../empresas/services/empresas.service';


@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styles: [
  ],
  providers:[ ErroresPipe ]
})
export class AgregarEditarComponent implements OnInit, OnDestroy {

  modalAgregarEditar! : Subscription
  agregarCliente!: Subscription
  modal!: Modal
  editar: boolean = false
  cliente!: Cliente
  loading: boolean = false
  loaded: boolean = false
  id!: number

  empresas: empresa[] = []

  form: FormGroup = this.fb.group( {
    nombre:['',Validators.required],
    empresa:['',Validators.required]
  })
  
  constructor(
    private store: Store<AppState>,
    private storeCliente: Store<ClienteAppState>,
    private fb: FormBuilder,
    private ErroresPipe: ErroresPipe,
    private empresasService: EmpresasService
  ) { }
  ngOnDestroy(): void {
    this.modalAgregarEditar.unsubscribe();
  }

  ngOnInit(): void {

    //estado del modal
    this.modalAgregarEditar =  this.storeCliente.select('modalAgregarEditar').subscribe(
        ( { loading, loaded, show, editar, cliente }) => {
          
          this.loading = loading
            
          if( show ){
            this.openModal()
            this.editar = editar      
          }

          if( loaded ){
            console.log( cliente );
            this.cliente = cliente!
            this.llenarCampos()
          }
        }
    )
  
    //estado que agregar o editar
    this.agregarCliente = this.storeCliente.select('agregarEditarCliente').subscribe(
      ( { loading, loaded, cliente, error, editar } ) => {
        
          
        if( loaded ){
          Swal.fire({
            title: 'Exito!',
            text: `El cliente ${cliente?.nombre} se ${ (editar)? 'edito':'creo' } correctamente`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
          })
  
          if(!editar){ this.form.reset(); }
          this.store.dispatch( actionsCliente.obtenerClientes() )
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

    //obtener empresas
    this.empresasService.obtenerEmpresas()
      .subscribe( ( empresas:empresa[] ) => {
        this.empresas = empresas
      })
      
  }

  openModal() {
    this.form.reset()
    const alerta: AlertaState = {
      mensaje: '',
      tipo: tipoAlerta.alert,
      estado: false
    }

    this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
    this.modal = new bootstrap.Modal( document.getElementById('agregarEditarCliente')! )
    this.modal.show()
  }

  llenarCampos() {
    
    this.form.get('nombre')?.setValue( this.cliente.nombre )
    this.form.get('empresa')?.setValue( this.cliente.empresa.id )
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

      this.storeCliente.dispatch( actionsCliente.agregarCliente( { nombre, empresa } ) )

    }else{
      this.storeCliente.dispatch( actionsCliente.editarCliente( { id: this.cliente.id!, nombre, empresa } ) )
    }

  }

}
