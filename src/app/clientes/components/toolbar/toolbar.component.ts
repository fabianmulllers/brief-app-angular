import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClienteAppState } from '../../store/cliente.reducer';
import * as  actionsClientes from '../../store/actions'
import * as actions from 'src/app/store/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [
  ]
})
export class ToolbarComponent implements OnInit {

  constructor(
    private storeCliente : Store<ClienteAppState>

  ) { }

  ngOnInit(): void {
  }
  
  agregar(){
    
    this.storeCliente.dispatch( actionsClientes.modalAgregar() );
  
  }
}
