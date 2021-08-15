import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { AlertaState } from '../../store/reducers/alerta.reducer';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [
  ]
})
export class AlertComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    
    this.store.select('alert').pipe(
      tap( console.log )
    ).subscribe(
      ( alerta ) => {

        this.crearAlerta(alerta);
      }
    )
  }

  getClassAlert(tipo: number){
      
      switch( tipo ){
        case 0:
          return 'alert-primary'

        case 1:
          return 'alert-success'
          
        case 2:
          return 'alert-warning'
          
        case 3:
          return 'alert-danger'

        default:
          return 'alert-primary'
      }
  }

  crearAlerta( alerta: AlertaState ){
    const divAlert = document.querySelector('.container-alerta');
    if(!alerta.estado) {
      divAlert!.innerHTML = '';
      return;
    }
    divAlert!.innerHTML = `
      <div 
        class="alert d-flex align-items-center ${ this.getClassAlert(alerta.tipo) } alert-dismissible fade show" 
        role="alert" >
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          <div>
            ${ alerta.mensaje}
          </div>
      </div>
    `;
  }

}
