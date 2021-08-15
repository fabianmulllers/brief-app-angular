import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { Areas, Role } from '../../interfaces/areas.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaRoleService {
  
  private basePath: string = environment.baseUrl
  constructor(
    private http: HttpClient
  ) { }

  obtenerAreas(){
    
    const url = `${ this.basePath}/area`;
    const headers = new HttpHeaders()
    .set('x-token',localStorage.getItem('token') || '')
    return this.http.get<Areas[]>( url,{ headers } )

  }
  

  obtenerRoles( AreaId: number){
    const url = `${ this.basePath}/area/ver-roles`
    const headers = new HttpHeaders()
    .set('x-token',localStorage.getItem('token') || '')
    return this.http.get<Role[]>( `${url}/${AreaId}`,{ headers} )

  }

}
