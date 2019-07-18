import { Component, OnInit } from '@angular/core';
import { Cliente } from './services/cliente';
import {ClientService} from './services/client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {


 //establecer variable igual al objeto Cliente
  clientes:Cliente[];
  constructor(private clientService:ClientService) { }

 // metodo cuando inica el comnponente
  ngOnInit()
  {

  	this.clientService.getCliente().subscribe(

           //recibimos la data del observable y lo asignamos en la varible de tipo objeto
  			data=>this.clientes=data
  		 // funcion anonima
  		  //  function(data)
  		  //  { 
  		  //  		console.log(data)
  		  //  	  // this.client=data;


        // }
        ,errorResponse=>{
          console.log("error al cargar los clientes:" + errorResponse);
          swal.fire('Error de conexion','no se pudo establecer la comunicacion con el backend','warning');
        }
  		  );


  }
  destroy(client:Cliente):void
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
      if (result.value) {
        this.clientService.delete(client.id)
          .subscribe(
            response => {

              this.clientes = this.clientes.filter(data => data !== client)
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
