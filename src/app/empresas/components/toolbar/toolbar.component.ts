import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

import * as actionsEmpresas  from '../../store/actions'
import * as actions from '../../../store/actions'

import { EmpresasModuleState } from '../../store/empresa.reducer';
import { ErroresPipe } from '../../../pipes/errores.pipe';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [
  ],
  providers: [ ErroresPipe]

})
export class ToolbarComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
		private storeEmpresas: Store<EmpresasModuleState>,
		private ErroresPipe: ErroresPipe
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    
  }

  agregar(){

    this.storeEmpresas.dispatch( actionsEmpresas.modalAgregar() )

  }

}
