import { Component, OnInit } from '@angular/core';
import { Cliente } from '../services/cliente';
import { ClientService } from '../services/client.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal  from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponentClient implements OnInit {

  /*instanciando el objeto */
	private client:Cliente = new Cliente();
  private titleNew:string="New Client";
  private errorBadRequest: string[];
  constructor(private clienteService:ClientService, private router:Router,private activeRouter:ActivatedRoute)
  {

  }

  ngOnInit()
  {
    this.edit();
  }

  store():void{

   this.clienteService.create(this.client)
   .subscribe(
      // response=>console.log(response)
     response=>
               {
                  /*response lo que devuelve el backend*/
                 swal.fire('Nuevo Cliente',`${response.mensaje}: ${response.cliente.nombre}`, 'success')
                 this.router.navigate(['/clientes'])
               },
               responseError=>{
 
                  this.errorBadRequest=responseError.error.errors as string[];
                  console.log(this.errorBadRequest);
               }

     )};

  edit():void{
    
      this.activeRouter.params.subscribe(
        params=>{

            let id= params['id']
            if(id)
            {
              this.clienteService.getClient(id).subscribe(response=>this.client=response);
            }
          
        }
        );

  }
  
  update():void
  {
     this.clienteService.update(this.client)
     .subscribe(response=>{
       swal.fire('Actualizacion de Cliente', `${ response.mensaje }: ${ response.cliente.nombre }`,'success')
       this.router.navigate(['/clientes'])

     })
         
  }
   cancelNew():void
  	{
  		this.router.navigate(['/clientes'])
  	}

}
