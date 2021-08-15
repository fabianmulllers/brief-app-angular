import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { AgregarEditarComponent } from './components/agregar-editar/agregar-editar.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainComponent } from './page/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';

import { RolesEffectsArray } from './store/effects/index'
import { StoreModule } from '@ngrx/store';
import * as reducers from './store/reducers'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarEditarComponent,
    TablaComponent,
    ToolbarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,

    ReactiveFormsModule,
    

    EffectsModule.forFeature( RolesEffectsArray),
    StoreModule.forFeature( 'obtenerRoles', reducers.obtenerRoleReducer ),
    StoreModule.forFeature( 'modalAgregarEditarRole', reducers.modalAgregarEditarRoleRecucer ),
    StoreModule.forFeature( 'agregarEditarRole', reducers.agregarEditarRoleReducer )

  ]
})
export class RolesModule { }
