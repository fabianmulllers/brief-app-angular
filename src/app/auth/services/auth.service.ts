import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { Auth } from '../../interfaces/auth.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
      
  private baseUrl = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  
  login( email: string, password: string){

    const base = `${this.baseUrl}/auth`
    const body = { email, password }

    return this.http.post<any>( base, body )

  }

  validarToken():Observable<boolean>{
    
    const url = `${ this.baseUrl}/auth/validar-token`
    const headers = new HttpHeaders().set(
      'x-token', localStorage.getItem('token') || ''
    )
    return this.http.get<Auth>(url, { headers })
    .pipe(
      map( (auth) => { 
        localStorage.setItem('token', auth.token )
        return true   
       }),
      catchError( error => of(false) )
    )
  }

}
