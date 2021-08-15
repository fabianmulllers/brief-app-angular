import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { show } from '../../usuarios/store/actions/modalAgregarEditar.action';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import * as actions from '../../store/actions'

@Component({
  selector: 'app-eliminar-elemento',
  templateUrl: './eliminar-elemento.component.html',
  styles: [
  ]
})
export class EliminarElementoComponent implements OnInit {
  
  modal!: Modal;
  texto: string = '';
  id: string | Number = '';
  elemento: string = '';
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  
    this.store.select('eliminarElemento')
    .subscribe( ( { show, id, texto, elemento, loaded } ) => {
      
      if(show){
        console.log( show )
        this.id = id;
        this.elemento = elemento;
        this.texto = texto;
        this.modal = new bootstrap.Modal( document.getElementById('eliminarElemento')! );
        this.modal.show();
      }

      if( loaded ){
        this.modal.hide();
      }

    });
  }

  eliminar(){
    this.store.dispatch( actions.eliminarElemento( { id: this.id, elemento: this.elemento } ) );
  }
  
}
