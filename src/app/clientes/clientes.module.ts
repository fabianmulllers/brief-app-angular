import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { TablaComponent } from './components/tabla/tabla.component';
import { AgregarEditarComponent } from './components/agregar-editar/agregar-editar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainComponent } from './page/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import * as reducers from './store/reducers'
import { clientesEffectsArray } from './store/effects'
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    TablaComponent,
    AgregarEditarComponent,
    ToolbarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,

    EffectsModule.forFeature( clientesEffectsArray),
    StoreModule.forFeature( 'obtenerClientes', reducers.obtenerClienteReducer ),
    StoreModule.forFeature( 'modalAgregarEditar', reducers.modalAgregarEditarClienteRecucer ),
    StoreModule.forFeature( 'agregarEditarCliente', reducers.agregarEditarClienteReducer )

  ]
})
export class ClientesModule { }
