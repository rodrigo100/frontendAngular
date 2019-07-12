import { Injectable } from '@angular/core';
import { Usuario} from './usuario';
import { of,Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndpoint:string="http://localhost:8080/api/v1/usuarios";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient)
  { }

  getUsuarios(): Observable<Usuario[]>{
  	return this.http.get<Usuario[]>(this.urlEndpoint);
  }

  create(user:Usuario): Observable<Usuario>{
  	return this.http.post<Usuario>(this.urlEndpoint,user,{headers:this.httpHeaders});
  }
  getUsuario(id):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndpoint}/${id}`);
  }
  update(user:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndpoint}/${user.id}`,user,{headers:this.httpHeaders})
  }

  delete(id:number):Observable<Usuario>
  {
    return this.http.delete<Usuario>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders});
   
  }
}
