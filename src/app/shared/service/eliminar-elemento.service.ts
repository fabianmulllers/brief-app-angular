import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EliminarElementoService {
  
  private _baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  eliminarElemento(id: Number | string, elemento:string ){
    
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '' );

    let url = `${ this._baseUrl }/${ elemento }/${ id }`  
    return this.http.delete( url, { headers } );
  
  }
}
