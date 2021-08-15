import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { Modal } from 'bootstrap'
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaRoleService } from '../../services/area-role.service';
import { Areas, Role } from '../../../interfaces/areas.interface';
import { Usuario } from 'src/app/interfaces/auth.interface';
import { AgregarUsuario } from '../../../interfaces/usuario.interface';
import * as actionsUsuarios from 'src/app/usuarios/store/actions'
import * as actions from 'src/app/store/actions'
import { AlertaState, tipoAlerta } from 'src/app/store/reducers';
import { ErroresPipe } from '../../../pipes/errores.pipe';
import { ValidatorService } from '../../services/validator.service';
import Swal from 'sweetalert2';
import { UsuariosState } from '../../store/reducers';
import { UsuariosModuleState } from '../../store/usuarios.reducer';

@Component({
  selector: 'app-agregar-editar',
  templateUrl: './agregar-editar.component.html',
  styles: [
  ],
  providers:[ErroresPipe]
})
export class AgregarEditarComponent implements OnInit {
  
  areas : Areas[] = [];
  roles : Role[] = [];
  myModal!: Modal;
  loading: boolean = false;
  loaded: boolean = false;
  editar: boolean = false;
  usuario!: Usuario;
    
  form : FormGroup = this.fb.group({
    
      nombre         : [ '' ,[ Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$') ] ],
      email          : [ '' ,[ Validators.required, Validators.email] ],
      area           : [ '' ,[ Validators.required, Validators.pattern('^[0-9 ]+$') ] ],
      role           : [ '' ,[ Validators.required, Validators.pattern('^[0-9 ]+$')  ] ],
      password       : [ '' ],
      confirmPassword: [ '' ],

    },
    {
      validators:[ this.validatorService.passwordMatch('password','confirmPassword')]
    }
  );
  
  
  getUsuario(){
    return ( !this.editar )? 'Agregar': 'Editar'
  }

  constructor(
    private store: Store<AppState>,
    private storeUsuarios: Store<UsuariosModuleState>,
    private fb: FormBuilder,
    private areaRoleService: AreaRoleService,
    private errores: ErroresPipe,
    private validatorService: ValidatorService
  ) { }

  ngOnInit(): void {

    this.storeUsuarios.select('modalAgregarEditar').subscribe(
      ( { mostrar, editar, usuario, loaded  } ) => {
    
        if( mostrar && loaded ){
          this.form.reset();
          this.openModal();
          const alerta: AlertaState = {
            mensaje: '',
            tipo: tipoAlerta.primary,
            estado: false
          }
  
          this.store.dispatch( actions.mostrarAlerta( { alerta } ) )

          this.editar = editar;
          if(loaded && usuario){
            this.form.get('password')?.removeValidators( [ Validators.required, Validators.minLength(6) ] );
            this.form.get('confirmPassword')?.removeValidators( [ Validators.required, Validators.minLength(6) ] );
            this.form.reset();
            this.llenarCamposUsuario( usuario );
            this.usuario = usuario;
          }

          if(!editar){
            console.log( 'ingresaste' );
            this.form.get('password')?.addValidators([ Validators.required, Validators.minLength(6) ])
            this.form.get('confirmPassword')?.addValidators( [ Validators.required, Validators.minLength(6) ] )
            this.form.reset();
          }

        } 
    });

    this.storeUsuarios.select('usuario').subscribe( ( { loading, loaded, error, usuario } ) => {
      this.loading = loading;
      if( loaded ){

        Swal.fire({
          title: 'Exito!',
          text: `El usuario ${usuario?.nombre} se ${ (this.editar)? 'edito':'creo' } correctamente`,
          icon: 'success',
          confirmButtonText: 'Cerrar'
        })

        if(!this.editar){ this.form.reset(); }
        this.store.dispatch( actionsUsuarios.obtenerUsuarios() )

      }

      if(error){
        const alerta: AlertaState = {
          mensaje: this.errores.transform( error ),
          tipo: tipoAlerta.alert,
          estado: true
        }

        this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
      }

    } );

  
    this.getAreas();

  }
  
  async getAreas(){

    await this.areaRoleService.obtenerAreas().subscribe(
      areas => {
        this.areas = areas;
      }
    )

    // console.log( this.areas );
  }

  camposEsValido(campo : string){
    
    return this.form.get(campo)?.invalid && 
    this.form.get(campo)?.touched;
  }

  openModal(){
  
    this.myModal = new bootstrap.Modal( document.getElementById('ModalAgregarEditarUsuarios')!, {
      keyboard: false
    } )


    this.myModal.show();
  }

  async cambiarArea(){

    this.form.get('role')?.setValue('');
    await this.areaRoleService.obtenerRoles( this.form.get('area')?.value ).subscribe(
      roles => {
        this.roles = roles;
      }
    )
    
  }

  enviar(){
    this.form.markAllAsTouched();

    if(this.form.invalid) return;
    
    const { nombre,email,area,role,password } = this.form.value

    let usuario: AgregarUsuario ={
      nombre,
      email,
      area,
      role,
    }
    

    if( !this.editar ){
      usuario = { ... usuario, password }
      this.store.dispatch( actionsUsuarios.agregarUsuario({ usuario } ) )
    }else{
      usuario = { ...usuario, id: this.usuario.id}
      this.store.dispatch( actionsUsuarios.editarUsuario({ usuario } ) )
    }

  }

  
  llenarCamposUsuario(usuario: Usuario){


    
    this.form.get('nombre')?.setValue( usuario.nombre );
    this.form.get('email')?.setValue( usuario.email );
    this.form.get('area')?.setValue( usuario.area.id );
    this.cambiarArea();
    this.form.get('role')?.setValue( usuario.role.id );



  }

}
