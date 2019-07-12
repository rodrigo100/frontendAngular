import { Injectable } from '@angular/core';
import {Usuario} from './usuario';
import { User } from './usuario.json';
import {of,Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   private urlEndpoint:string = 'http://localhost:8080/api/v1/clientes';
  constructor(private http:HttpClient)
  {
   }
   
  // getUsuarios(): Usuario[]{
  //   return User;
  // }

  getUsuarios(): Observable<Usuario[]>{
  	// return of(User);
    return this.http.get<Usuario[]>(this.urlEndpoint);
  }
}
