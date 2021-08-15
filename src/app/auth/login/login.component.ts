import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as actions from '../../store/actions'
import * as actionsAuth from '../store/actions/auth.action'
import { AlertaState, tipoAlerta } from '../../store/reducers/alerta.reducer';
import { AppStateAuth } from '../store/reducers/auth.reducer';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  form: FormGroup = this.fb.group({
    email:[ 'fabian@muller.cl',[ Validators.email,Validators.required ] ],
    password:[ '123456',[ Validators.required, Validators.minLength(6) ] ]
  })

  constructor(
     private fb: FormBuilder,
     private store : Store<AppState>,
     private storeAuth: Store<AppStateAuth>
  ) { }

  ngOnInit(): void {
    this.storeAuth.select('auth')
      .subscribe( ( { loading, loaded, error, auth } ) => {

          if(loaded){
            console.log( 'ingresaste aqui' );
            localStorage.setItem('token', auth!.token);
            const alerta: AlertaState = {
              mensaje: 'Ingresaste',
              tipo: tipoAlerta.success,
              estado: true
            }
            this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
          }

          if(error){
            const alerta: AlertaState = {
              mensaje: error.msg,
              tipo: tipoAlerta.alert,
              estado: true
            }
            this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
          }
      } )
  }
  
  
  login(){
    
    const { email, password } = this.form.value;
    const alerta: AlertaState = {
      mensaje: '',
      tipo: tipoAlerta.primary,
      estado: false
    }
    this.store.dispatch( actions.mostrarAlerta( { alerta } ) )
    this.store.dispatch( actionsAuth.identificarUsuario( { email, password } ) );

  }
}
