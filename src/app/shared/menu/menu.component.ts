import { Component, OnInit } from '@angular/core';

interface menu{
  nombre:string;
  path:string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  menus: menu[]  = [
      {
        nombre:'Inicio',
        path:'/'
      },
      {
        nombre:'Usuarios',
        path:'/usuarios'
      }
  ]
  constructor() { }

  ngOnInit(): void {
  }


}
