import { Injectable } from '@angular/core';
//importacion desde la raiz del componente
//import { Cliente } from '../cliente';
import { Cliente } from './cliente';
import { of,Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint:string= "http://localhost:8080/api/v1/clientes"
  private httpHeaders = new  HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient)
  { }

 

  getCliente(): Observable<Cliente[]>{
  	return this.http.get<Cliente[]>(this.urlEndpoint);
  }
  create(client:Cliente):Observable<Cliente>{
  	return this.http.post<Cliente>(this.urlEndpoint,client,{headers:this.httpHeaders});
  }
  getClient(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`);
  }
  update(client:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndpoint}/${client.id}`,client,{headers:this.httpHeaders});
  }
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders});
  }
}
 