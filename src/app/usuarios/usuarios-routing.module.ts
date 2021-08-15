import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path:"",
    component: MainComponent,
    children:[
      {  path:'listado',component: ListadoComponent  },
      {  path:'**', redirectTo:'listado' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
