import { Injectable } from '@angular/core';
import { Usuario} from './usuario';
import { of,Observable,throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import {HttpClient,HttpHeaders} from '@angular/common/http'; 
import swal from 'sweetalert2';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndpoint:string="http://localhost:8080/api/v1/usuarios";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient,private routes:Router)
  { }

  getUsuarios(): Observable<Usuario[]>{
  	return this.http.get<Usuario[]>(this.urlEndpoint);
  }

  create(user:Usuario): Observable<Usuario>{
  	return this.http.post<Usuario>(this.urlEndpoint,user,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        swal.fire('Error al Registrar',e.error.mensaje,'info');
        return throwError(e);
      })
    );
  }
  getUsuario(id):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlEndpoint}/${id}`).pipe(
      
       catchError(e=>{
         this.routes.navigate(['/usuarios']);
          console.log(e.error.mensaje);
          swal.fire('Editar usuario',e.error.mensaje,'error');
          return throwError(e);
       })

    );
  }
  update(user:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.urlEndpoint}/${user.id}`,user,{headers:this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error al Actualizar', e.error.mensaje, 'info');
        return throwError(e);
      })
    );
  }

  delete(id:number):Observable<Usuario>
  {
    return this.http.delete<Usuario>(`${this.urlEndpoint}/${id}`,{headers:this.httpHeaders}).pipe(
      catchError(e => {
        swal.fire('Error al Eliminar', e.error.mensaje, 'info');
        return throwError(e);
      })
    );
   
  }
}
