import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Cliente } from '../../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private _baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  obtenerClientes(): Observable<Cliente[]>{
    const url = `${ this._baseUrl }/cliente`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<Cliente[]>( url, { headers });
  }

  obtenerCliente( id: number ): Observable<Cliente>{
    const url = `${ this._baseUrl }/cliente/${ id }`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<Cliente>( url, { headers });
  }

  agregarCliente( nombre: string, empresa: number ): Observable<Cliente>{
    const url = `${ this._baseUrl }/cliente`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    const body = {
      nombre,
      empresa
    }

    return this.http.post<Cliente>( url, body, { headers });
  }


  editarCliente( id: number, nombre: string, empresa: number ): Observable<Cliente>{
    const url = `${ this._baseUrl }/cliente/${ id }`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    const body = {
      nombre,
      empresa
    }

    return this.http.put<Cliente>( url, body ,{ headers });
  }

  
}
