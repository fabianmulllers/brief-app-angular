import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { empresa } from '../../interfaces/empresa.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private _baseUrl: string = environment.baseUrl
  constructor(
    private http: HttpClient
  ) { }

  
  obtenerEmpresas(): Observable<empresa[]>{
    
    const url: string = `${ this._baseUrl }/empresa`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<empresa[]>( url,{ headers } )
    
  }

  obtenerEmpresa( id : number){
    
    const url: string = `${ this._baseUrl }/empresa/${ id }`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<empresa>( url,{ headers } )

  }

  agregarEmpresa( nombre: string ){
      
    const url: string = `${ this._baseUrl}/empresa`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    const body = { nombre };

    return this.http.post<empresa>( url,body, { headers} )
  }

  editarEmpresa( id:number, nombre: string ){

    const url: string = `${ this._baseUrl}/empresa/${ id }`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')
    const body = { nombre };

    return this.http.put<empresa>( url,body, { headers} )

  }

}
