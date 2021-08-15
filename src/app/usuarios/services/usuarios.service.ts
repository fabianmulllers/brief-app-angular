import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Usuarios } from 'src/app/interfaces/usuario.interface';
import { environment } from '../../../environments/environment.prod';
import { AgregarUsuario } from '../../interfaces/usuario.interface';
import { Usuario } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  private baseUrl:string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  obtenerUsuarios(){
    const url = `${this.baseUrl}/usuario`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '' )
    return this.http.get<Usuarios[]>( url,{ headers })
  }

  agregarUsuario( usuario: AgregarUsuario): Observable<Usuario>{
    
    const url = `${ this.baseUrl }/usuario`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '' )
    
    const body = usuario;
    return this.http.post<Usuario>( url,body, { headers })

  }


  editarUsuario( usuario: AgregarUsuario): Observable<Usuario>{
    
    const url = `${ this.baseUrl }/usuario/${ usuario.id }`
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '' )
    
    const body = usuario;
    return this.http.put<Usuario>( url,body, { headers })

  }

  obtenerUsuario( id : number): Observable<Usuario>{
      
    const url = `${ this.baseUrl }/usuario/${ id }`
    const headers =  new HttpHeaders()
    .set( 'x-token', localStorage.getItem('token') || '')
    return this.http.get<Usuario>( url, { headers } );

  }


}
