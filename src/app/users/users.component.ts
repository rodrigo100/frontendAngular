import { Component, OnInit } from '@angular/core';
import { Usuario } from './services/usuario';
import { UserService } from './services/user.service';
import swal from 'sweetalert2'; 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

 users:Usuario[];
  constructor(private userService:UserService) { }

  ngOnInit()
  {
  	 this.userService.getUsuarios().subscribe(
           data=>this.users=data,
           errorResponse => {
                console.log("error al cargar los clientes:" + errorResponse);
                swal.fire('Error de conexion', 'no se pudo establecer la comunicacion con el backend', 'warning');
             }
            //  data=>console.log(data)
  	 	);
  }


  destroy(user:Usuario):void
  {    

            swal.fire({
            title: 'Atencion.!?',
            text: "Esta seguro de Eliminar!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value)
           {
             this.userService.delete(user.id)
             .subscribe(
                response=>{

                  this.users=this.users.filter(data=>data !==user)
                    swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
               )
               }
            
            )
          }
        })
  }

}
