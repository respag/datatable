import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuariosService {

  constructor(private http:HttpClient) { }

   public getUsuarios():Observable<Usuario[]> {
    return  this.http.get<Usuario[]>('http://apiuser.azurewebsites.net/api/usuarios');
  }
}
