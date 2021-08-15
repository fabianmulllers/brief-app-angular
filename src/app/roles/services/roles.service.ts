import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../../interfaces/roles.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private _baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  obtenerRoles(): Observable<Role[]>{
    const url = `${ this._baseUrl }/role`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<Role[]>( url, { headers });
  }

  obtenerRole( id: number ): Observable<Role>{
    const url = `${ this._baseUrl }/role/${ id }`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<Role>( url, { headers });
  }

  agregarRole( nombre: string ): Observable<Role>{
    const url = `${ this._baseUrl }/role`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    const body = {
      nombre
    }

    return this.http.post<Role>( url, body, { headers });
  }


  editarRole( id: number, nombre: string ): Observable<Role>{
    const url = `${ this._baseUrl }/role/${ id }`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

    const body = {
      nombre
    }

    return this.http.put<Role>( url, body ,{ headers });
  }

}
