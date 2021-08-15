import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path:"auth", 
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule) 
  },
  {
    path:'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesModule ),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path:'empresas',
    loadChildren: () => import('./empresas/empresas.module').then( m => m.EmpresasModule ),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path:'roles',
    loadChildren: () => import('./roles/roles.module').then( m => m.RolesModule ),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path:"usuarios",
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosModule ),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
