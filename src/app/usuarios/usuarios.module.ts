import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { SharedModule } from '../shared/shared.module';
import { TablaComponent } from './components/tabla/tabla.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AgregarEditarComponent } from './components/agregar-editar/agregar-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MostrarUsuarioComponent } from './components/mostrar-usuario/mostrar-usuario.component';
import { Store, StoreModule } from '@ngrx/store';
import * as reducers from './store/reducers/';
import { EffectsModule } from '@ngrx/effects';
import { UsuariosModuleEffectsArray } from './store/effects';
import { usuariosReducer } from './store/reducers/usuarios.reducer';


@NgModule({
  declarations: [
    MainComponent,
    ListadoComponent,
    TablaComponent,
    ToolbarComponent,
    AgregarEditarComponent,
    MostrarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature( UsuariosModuleEffectsArray ),
    StoreModule.forFeature( 'usuarios', reducers.usuariosReducer ),
    StoreModule.forFeature( 'modalAgregarEditar', reducers.modalAgregarEditarReducer ),
    StoreModule.forFeature( 'usuario', reducers.usuarioReducer ),
    StoreModule.forFeature( 'mostrarUsuario', reducers.mostrarUsuarioReducer ),
    
    // StoreModule.forFeature( 'mostrarUsuario', reducers.mostrarUsuarioReducer )
  ]
})
export class UsuariosModule { }
