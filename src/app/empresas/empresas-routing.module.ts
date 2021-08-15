import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children:[
      { path: '**', redirectTo:''  }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresasRoutingModule { }
