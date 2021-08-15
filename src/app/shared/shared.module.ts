import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AlertComponent } from './alert/alert.component';
import { MenuComponent } from './menu/menu.component';
import { EliminarElementoComponent } from './eliminar-elemento/eliminar-elemento.component';
import { ToastsComponent } from './toasts/toasts.component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';


@NgModule({
  declarations: [
    AlertComponent,
    MenuComponent,
    EliminarElementoComponent,
    ToastsComponent,
    ModalAlertComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    AlertComponent,
    MenuComponent,
    EliminarElementoComponent,
    ToastsComponent
  ]
})
export class SharedModule { }



