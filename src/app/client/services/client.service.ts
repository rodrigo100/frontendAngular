import { Injectable } from '@angular/core';
//importacion desde la raiz del componente
//import { Cliente } from '../cliente';
import { Cliente } from './cliente';
import { of,Observable,throwError } from 'rxjs';
import { map,catchError} from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndpoint:string= "http://localhost:8080/api/v1/clientes"
  private httpHeaders = new  HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient,private router:Router)
  { }

 

  getCliente(): Observable<Cliente[]>{
  	return this.http.get<Cliente[]>(this.urlEndpoint);
  }
  create(client:Cliente):Observable<any>{
  	return this.http.post<any>(this.urlEndpoint,client,{headers:this.httpHeaders}).pipe(
      // map((response:any)=>response.cliente as Cliente),
      catchError(e =>
        {
            console.log(e.error.Error);
             swal.fire('Error al insertar',e.error.error,'info');
             return throwError(e);
        })
    );
  }
  getClient(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        swal.fire('Error en la busqueda', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  update(client:Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${client.id}`,client,{headers:this.httpHeaders}).pipe(

       catchError(e=>
        {
          swal.fire('Error al actualizar',e.error.error,'info');
          return throwError(e);
        })
    );
  }
  delete(id:number):Observable<Cliente>
  {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        swal.fire('Error al eliminar',e.error.error,'info');
        return throwError(e);
      })
    );
  }
}
 