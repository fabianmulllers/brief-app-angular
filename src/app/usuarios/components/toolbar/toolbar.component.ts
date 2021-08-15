import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as actions from 'src/app/usuarios/store/actions'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [
  ]
})
export class ToolbarComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }
  

  mostrarAgregar(){
    
    this.store.dispatch( actions.show({ mostrar: true }) );
  }
  
}
