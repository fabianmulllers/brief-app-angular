import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Modal } from 'bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { EmpresasModuleState } from '../../store/empresa.reducer';

import * as actions from '../../../store/actions'
import * as actionsEmpresa from '../../store/actions'

import { ErroresPipe } from '../../../pipes/errores.pipe';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { empresa } from '../../../interfaces/empresa.interface';
import { AlertaState, tipoAlerta } from 'src/app/store/reducers';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styles: [
  ],
  providers: [ ErroresPipe]
})
export class AgregarEditarComponent implements OnInit, OnDestroy {

  agregarEditarempresa!: Subscription
  modalEditar!: Subscription
	modal!: Modal
	editar: boolean = false
  id!: number 
  empresa!: empresa

  form : FormGroup = this.fb.group({
    nombre: ['',Validators.required]
  })
  
  constructor(
    private store: Store<AppState>,
		private storeEmpresas: Store<EmpresasModuleState>,
		private ErroresPipe: ErroresPipe,
    private fb: FormBuilder
  ) { }


  ngOnDestroy(): void {
    
    this.agregarEditarempresa.unsubscribe();
    this.modalEditar.unsubscribe();
  }

  ngOnInit(): void {

    this.agregarEditarempresa = this.storeEmpresas.select('empresa')
    .subscribe( ( { loading, loaded, error, show, editar, id, empresa } ) => {
      this.limpiarError()
      if( show && !editar ){
        this.editar = false
        this.openModal()
      }

      if( loaded ){
        Swal.fire({
          title: 'Exito!',
          text: `La empresa ${empresa?.nombre} se ${ (this.editar)? 'edito':'creo' } correctamente`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })

        if(!this.editar){ this.form.reset(); }
        this.store.dispatch( actionsEmpresa.obtenerEmpresas() )
      }

      if( error ){
        const alerta: AlertaState = {
          mensaje: this.ErroresPipe.transform( error ),
          tipo: tipoAlerta.alert,
          estado: true
        }

        this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
      }
  
    })

    this.modalEditar = this.storeEmpresas.select('modalEditar')
    .subscribe( ( { loading, loaded, error, show, id, empresa } ) => {
      this.limpiarError()
      
      if( show ){
        this.editar = true,
        this.id = id!
      }

      if( loaded && empresa){
        this.empresa = empresa!
        this.llenarCampos()
        this.openModal()
      }

      if( error ){
        const alerta: AlertaState = {
          mensaje: this.ErroresPipe.transform( error ),
          tipo: tipoAlerta.alert,
          estado: true
        }

        this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
      }
      
    })

  }

  campoValido( campo: string ){
    
    return this.form.get( campo )?.invalid &&
    this.form.get( campo )?.touched
  }
  
  openModal(){

		this.modal = new bootstrap.Modal( document.getElementById('agregarEditarEmpresa')! )
    this.modal.show();

	}

  enviar(){
    this.form.markAllAsTouched()
    if( this.form.invalid ) return;
    const nombre: string  = this.form.get('nombre')?.value

    if( !this.editar ){
      this.storeEmpresas.dispatch( actionsEmpresa.agregarEmpresa( { nombre } ) )
    }else{
      this.storeEmpresas.dispatch( actionsEmpresa.editarEmpresa( { nombre, id: this.id } ) )
    }
  }

  llenarCampos(){
    console.log( this.empresa )
    if(this.empresa){
      this.form.get('nombre')?.setValue( this.empresa.nombre)
    }
  }

  limpiarError(){
    const alerta: AlertaState = {
      mensaje: '',
      tipo: tipoAlerta.alert,
      estado: false
    }

    this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
  }

}
