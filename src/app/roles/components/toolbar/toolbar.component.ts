import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RoleAppState } from '../../store/role.reducers';
import * as  actionsRoles from '../../store/actions'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [
  ]
})
export class ToolbarComponent implements OnInit {

  constructor(
    private storeRole : Store<RoleAppState>
  ) { }

  ngOnInit(): void {
  }

  agregar(){
    
    this.storeRole.dispatch( actionsRoles.modalAgregar() );
  
  }

}
