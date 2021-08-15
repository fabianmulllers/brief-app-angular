import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { MainComponent } from './page/main/main.component';
import { AgregarEditarComponent } from './components/agregar-editar/agregar-editar.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StoreModule } from '@ngrx/store';
import * as reducers from './store/reducers'
import { EffectsModule } from '@ngrx/effects';
import { EmpresasModuleEffectArray } from './store/effects'
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    AgregarEditarComponent,
    TablaComponent,
    ToolbarComponent,
    
  ],
  imports: [
    CommonModule,
    EmpresasRoutingModule,
    EffectsModule.forFeature( EmpresasModuleEffectArray ),
    StoreModule.forFeature('obtenerEmpresas', reducers.obtenerEmpresasReducer ),
    StoreModule.forFeature('empresa', reducers.empresaReducer ),
    StoreModule.forFeature('modalEditar', reducers.modalEditarReducer ),
    SharedModule,

    ReactiveFormsModule
  ]
})
export class EmpresasModule { }
